
// customize the primary CTA for those who have freshly created their badge
const updateCTA = () => {
  if(document.location.hash == "#fresh"){

    // Update CTA
    const primaryCTA = document.getElementsByClassName("primary-cta")[0]; 
    const badgeId = window.location.pathname.split("/")[2];
    primaryCTA.href = `https://twitter.com/intent/tweet?text=Got my badge ready for @jamstackconf 2021! See you there? https://jamstackconf.com/badge/${badgeId}`;
    primaryCTA.innerHTML = "Show off your badge!";

    // hide tout
    const regTout =  document.getElementById("tout-register");
    regTout.style.display = "none";

    // keep the URL clean incase the user shares it directly
    history.pushState(null, "Share your badge", `${window.location.pathname}`);        
  } 
 }
 
 updateCTA();

 