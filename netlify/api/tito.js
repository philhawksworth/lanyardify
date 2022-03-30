require('dotenv').config();

const fetch = require("node-fetch");

async function getRegistration(ticketSlug) {
  if (!ticketSlug) {
    return {
      ticket: "",
      name: "",
    };
  }

  let res = await fetch(`https://api.tito.io/v3/netlify/jamstack-conf-2021/registrations/${ticketSlug}`, {
    method: "get",
    headers: {
      Authorization: `Token token=${process.env.TITO_API_TOKEN}`,
      Accept: "application/json",
    },
  });

  let json = await res.json();

  if (!json.registration) {
    console.log("Could not find tito registration for", ticketSlug);
    return {
      ticket: "",
      name: "",
    };
  }

  console.log("Looking for", ticketSlug, " returned", JSON.stringify(json, null, 2));

  return {
    ticket: json.registration.slug,
    name: json.registration.name,
  };
}

module.exports = {
  query: getRegistration
}