require('dotenv').config();

const fetch = require("node-fetch");
const tito = require("./netlify/api/tito.js");

(async function() {
  const ticketSlug = "reg_test_p0q214h94NHfrdSVbS4FdPA";
  console.log( await tito.query(ticketSlug) );
})();
