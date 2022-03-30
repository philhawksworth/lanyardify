// Show a form for making a custom badge 
// If a ticket number is found in the URL, prime the form with it

const cookie = require("cookie");
const tito = require('../api/tito.js');
const page = require('../layouts/badge-form.js');

// Not available via ENV variable
const host = "https://jamstackconf.com";

exports.handler = async (event) => {
  
  let ticketNumber = event.path.split("badge/make/")[1];
  let userData = await tito.query(ticketNumber);

  let options = {};
  // ?registration=success and ticket found in Tito data
  if(event.queryStringParameters.registration && userData && userData.ticket) {
    options.showRegistrationMessage = true;
  }

  // if ticket number not found in the URL and cookie value exists, redirect
  if(!ticketNumber && event.headers.cookie) {
    let cookies = cookie.parse(event.headers.cookie);
    if(cookies["jamstack-last-ticket-registration-slug"]) {
      return {
        statusCode: 302,
        headers: {
          Location: `${host}/badge/make/${cookies["jamstack-last-ticket-registration-slug"]}`,
          "Cache-Control": "no-cache",
        },
      };
    }
  }

  return {
    statusCode: 200,
    body: page(userData, options)
  };

};
