const page = require('./base.js');


module.exports = (data) => {

  var lastSpace = data.DisplayName.lastIndexOf(' ');
  const formattedName = `${data.DisplayName.substr(0, lastSpace)}<br/>${data.DisplayName.substr(lastSpace+1)}`;

  const badge = `
  <div class="container">
    <div class="info-pane">
      <h1 class="jamstack-conf-logo">Jamstack Conf 2021</h1>
      <div class="strap">
        <span class="tape started">how it started</span>
        <span class="tape going">how it's going</span>
        <span class="tape date">Oct 6-7</span>
      </div>
      <div class="panel-blue panel-shadow">
        <p class="salutation">${data.DisplayName.split(" ")[0]} will be lookin’ hella fly at Jamstack Conf this year!</p>
        <p id="tout-register">
          Register and create your own badge!
        </p>
        <p>
          <a class="primary-cta panel-shadow" href="https://jamstackconf.com">Join the party!</a>
        </p>
      </div>
      <p>
        Not appropriate? <a href="mailto:community@jamstack.org?subject=Inappropriate image - ${data.Path}&body=I am reporting the images on the following page as inappropriate: https://jamstackconf.com/badge/${data.Path}">Let us know</a>.
      </p>
    </div>  
    <div class="badge-pane">
      <img class="badge-bg" src="/badge/img/blue-badge-bg-2.png">
      <img class="badge-image-now" src="${data.ImageNowUrl}" alt="">
      <img class="badge-image-then" src="${data.ImageThenUrl}" alt="">
      <div class="badge-label">
        <p class="badge-name">${formattedName}</p>
      </div>
    </div>  
  </div>  
  `;

  return page({
    "title" : "Customize your conference badge",
    "content" : badge,
    "badgeNumber" : data.Path,
    "preloadImages": ["/badge/img/blue-badge-bg.png"],
    "scripts": ["badge-cta.js"]
  });

}
