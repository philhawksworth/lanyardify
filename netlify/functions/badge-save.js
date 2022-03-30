const stream = require("stream");
const Busboy = require("busboy");
const cloudinary = require("cloudinary").v2;
const { createClient } = require('@supabase/supabase-js');
const { customAlphabet } = require('nanoid');
const tito = require('../api/tito.js');


const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;


const handlePost = (event) => {
  return new Promise((resolve, reject) => {

    const busboy = new Busboy({ headers: event.headers });
    const fields = {};
    
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      let buf = Buffer.alloc(0);
      file.on("data", function (data) {
        buf = Buffer.concat([buf, data]);
      });
      file.on("end", function () {
        const imgBase64 = buf.toString("base64");
        fields[fieldname] = {
          filename,
          type: mimetype,
          dataUri: `data:${mimetype};base64,${imgBase64}`
        };
      });
    });
    busboy.on("field", (fieldName, value) => {
      fields[fieldName] = value;
    });
    
    busboy.on("finish", function () {
      resolve(fields);
    });

    /**
      * busboy needs to be processed using the stream pipe method.
      * After the body is decoded into a buffer,
      * Convert it into a stream and pipe it to busboy
      */
    const bodyBuf = Buffer.from(event.body, "base64");
    var bufferStream = new stream.PassThrough();
    bufferStream.end(bodyBuf);
    bufferStream.pipe(busboy);

  });
};



exports.handler = async (event) => {
  
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "text/html",
      },
      body: "HTTP Method not allowed"
    };
  }
    
  const fields = await handlePost(event);
  console.log({fields});

  // Is this ticket number valid and who is it registered to?
  const userData = await tito.query(fields.ticket);

  // If no ticket found with this number, send to the registration page
  if (!userData || !userData.ticket) {
    console.log(`no ticket data found`);
    return {
      statusCode: 302,
      headers: {
        Location: `https://jamstackconf.com/`,
      },
    };
  }

  // generate an (almost certainly) unique path
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, 12);
  const badgePath = nanoid();

  // upload the images to cloudinary and get URLs
  let uploadPromises = [
    { when:"now", url: fields.now.dataUri},
    { when:"then", url: fields.then.dataUri}].map((picture) =>
    cloudinary.uploader.upload(picture.url, {
        folder: "lanyardify",
        resource_type: "image",
        public_id: `${badgePath}-${picture.when}`,
        transformation: [{ gravity: "faces", crop: "fill", height: 400, width: 400 } ]
      })
    );

  const result = await Promise.all(uploadPromises).catch(function(err) {
    console.log("Cloudinary error:", err.message);
    // Render a response
    return {
      statusCode: 302,
      headers: {
        Location: `/badge/make#imageError`,
      },
    }
  });

  
  // Connect to database
  const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

  // Save our data to the DB
  const { data, error } = await supabase
  .from('badgedata')
  .upsert(
    {
      TicketNumber: fields.ticket,
      Path: badgePath,
      DisplayName: userData.name,
      ImageNowUrl: result[0].secure_url,
      ImageThenUrl: result[1].secure_url,
      OptOut: fields.excludeFromSite
    }
  );

  if (error) {
    console.log("Error saving badge data:", error );
  }
    
  // Render a response
  return {
    statusCode: 302,
    headers: {
      Location: `/badge/${badgePath}#fresh`,
    },
  }

};

