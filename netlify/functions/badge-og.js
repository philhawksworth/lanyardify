// Get the data for a given badge number and 
// generate an image for it with cloudinary

const { createClient } = require('@supabase/supabase-js');
const utf8 = require('utf8');
const fetch = require('node-fetch');

const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;


const handler = async (event) => {
  
  // fs the badge data for this ticket
  const path = event.path.split("/og/badge/")[1];

  // Connect to database and fetch data
  const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);
  const { data } = await supabase
    .from('badgedata')
    .select('*')
    .eq('Path', path)
    .is('Banned', false);;

  // No custom badge on this URL? 
  // Display a generic OG image with a CTA to register
  if (!data.length) {
    console.log(`no badge found`);
    return;
  }

  let badgeData = data[0];
  const salutationText = encodeURI(`${badgeData.DisplayName.split(" ")[0]} will be lookin’ hella fly at Jamstack Conf this year!`);
  
  // only split the name on the final space
  var lastSpace = badgeData.DisplayName.lastIndexOf(' ');
  const formattedName = `${badgeData.DisplayName.substr(0, lastSpace)}%0A${badgeData.DisplayName.substr(lastSpace+1)}`;
  

  // Fetch a generated image from Cloudinary
  const bgImageUrl = "v1629746298/lanyardify/og-badge-blue.png";
  const nameLabel = `c_fit,bo_8px_solid_black,l_text:Roboto_42_bold_stroke:${encodeURI(formattedName)},co_rgb:FFFFFF,g_north_west,y_460,x_65,w_560`;
  const salutation = `c_fit,bo_8px_solid_black,l_text:Roboto_38_bold_center_stroke:${salutationText},co_rgb:FFFFFF,g_north_west,y_260,x_690,w_470`;
  const thenImage = `l_lanyardify:${path}-then,g_north_west,w_168,x_65,y_180`;
  const nowImage = `l_lanyardify:${path}-now,g_north_west,w_229,x_319,y_65`;
  const ogUrl = `https://res.cloudinary.com/netlify/image/upload/${nameLabel}/${salutation}/${thenImage}/${nowImage}/${bgImageUrl}`;

  let image;
  try {
    const result = await fetch(ogUrl);
    image = await result.buffer();
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    }
  }

  // return the image directly
  return {
    statusCode: 200,
    headers: {
      'Content-type': 'image/jpeg'
    },
    body: image.toString('base64'),
    isBase64Encoded: true
  }
  
};

exports.handler = handler;