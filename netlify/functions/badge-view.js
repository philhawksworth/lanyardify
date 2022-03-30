// if data for a badge exists, render it. 
// Otherwise redirect to the view to create it

const { builder } = require('@netlify/functions');
const { createClient } = require('@supabase/supabase-js');
const page = require('../layouts/badge-page.js');

const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;


const handler = async (event) => {
  

  // Fetch the badge data for this ticket
  const path = event.path.split("/badge/")[1];

  console.log(`show badge ${path}`);
  

  // Connect to database and fetch data
  const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);
  const { data, error } = await supabase
    .from('badgedata')
    .select('*')
    .eq('Path', path)
    .is('Banned', false);

  // No custom badge on this URL? Send the user to the form to make one
  if (!data.length) {
    console.log(`no badge found`);
    return {
      statusCode: 302,
      headers: {
        Location: `https://jamstackconf.com/`,
      },
    };
  }

   // render the data into the template
   console.log(`ODB render of ${path}`);
   return {
     statusCode: 200,
     headers: {
       "Content-Type": "text/html",
     },
     body: page(data[0])
   }

};

exports.handler = builder(handler);