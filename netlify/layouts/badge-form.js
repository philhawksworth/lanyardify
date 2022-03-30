const page = require('./base.js');


// If we get a valid ticket number, display the user name 
// Otherwise give the user a way to enter their ticket number
const form = (userData, options = {}) => {

  let copy = {
    displayName: "An Excited Jamstacker",
    title: "Let's customize your virtual badge!",
  };

  if(options.showRegistrationMessage) {
    copy.title = "You’re registered—now let’s customize your virtual badge!"
  }

  let nameField;
  if(userData.name) {
    nameField = `<div class="form-field">
      <div class="form-field-label">Name:</div>
      <div class="form-field-input">${userData.name}</div>
    </div>`;
  } else {
    nameField = `<div class="guidance">
    <p>
      No ticket? No problem!</p><p>Get one by <a href="https://jamstackconf.com/#register">registering for free</a>
    </p>
    </div>
  `;
  }

  let ticketNumberField;
  if(userData.ticket) {
    ticketNumberField = `<input type="hidden" name="ticket" value="${userData.ticket || ""}" />`;
  } else {
    ticketNumberField = `<div class="form-field">
    <label for="ticket" class="form-field-label">
      Ticket <abbr title="Number">#</abbr>:
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.332 2.25391L16.9961 0.917969C16.5742 0.496094 15.9766 0.25 15.4141 0.25C14.8516 0.25 14.2539 0.496094 13.832 0.917969L3.8125 10.9375L2.08984 12.6602C1.98438 12.7656 1.94922 12.8711 1.91406 12.9766L1 17.582C0.929688 17.9336 1.21094 18.25 1.52734 18.25C1.5625 18.25 1.63281 18.25 1.66797 18.25L6.27344 17.3359C6.37891 17.3008 6.48438 17.2656 6.58984 17.1602C6.58984 17.1602 7.25781 16.4922 8.27734 15.4375H8.3125C11.5469 12.2031 18.2266 5.52344 18.332 5.41797C19.2109 4.53906 19.2109 3.13281 18.332 2.25391ZM4.9375 11.4297L12.0742 4.25781L14.9922 7.17578L7.82031 14.3125H4.9375V11.4297ZM5.88672 16.2461L2.26562 16.9844L3.00391 13.3633L3.8125 12.5547V15.4375H6.69531L5.88672 16.2461ZM17.5234 4.64453L15.7656 6.40234L12.8477 3.48438L14.6055 1.72656C14.8164 1.51562 15.0977 1.375 15.4141 1.375C15.6953 1.375 16.0117 1.51562 16.2227 1.72656L17.5234 3.02734C17.9805 3.48438 17.9805 4.1875 17.5234 4.64453Z" fill="white"/>
      </svg>
    </label>
    <input type="text" name="ticket" id="ticket" class="form-field-input" value="${userData.ticket || ""}" required />
  </div>`
  }

  return `
  <div class="container">
    <div class="info-pane">
      <h1 class="jamstack-conf-logo">Jamstack Conf 2021</h1>
      <div class="strap">
        <span class="tape started">how it started</span>
        <span class="tape going">how it's going</span>
        <span class="tape date">Oct 6-7</span>
      </div>
      <div class="panel-blue panel-shadow">
        <p class="salutation">${copy.title}</p>

        <form action="/badge/save" method="POST" enctype="multipart/form-data" name="badge">
          ${ticketNumberField}
          ${nameField}
          <div class="upload-files">
            <div class="form-field">
              <input type="file" id="img-upload-then" name="then" accept="image/*" required>
              <label class="file-upload-icon shadow-yellow" for="img-upload-then"><img src="/badge/img/btn-image-upload.svg" alt="Select file to upload"></label>
              <label class="form-field-label" for="img-upload-then">How it started</label>
            </div>
            <div class="form-field">
              <input type="file" id="img-upload-now" name="now" accept="image/*" required>
              <label class="file-upload-icon shadow-pinklight" for="img-upload-now"><img src="/badge/img/btn-image-upload.svg" alt="Select file to upload"></label>
              <label class="form-field-label" for="img-upload-now">How it's going</label>
            </div>
          </div>
          <div class="guidance">
            <p>
              We've all been through changes in our lives!
            </p>  
            <p>
              We invite you to share who you are and who you were.
            </p>  
            <p>
              Square-ish images work best (2MB max).
            </p>  
          </div>
          <p>
            <input type="submit" class="primary-cta panel-shadow" id="submit" value="Laminate!">
          </p>
        </div>
        <p>
          <input type="checkbox" name="excludeFromSite" id="excludeFromSite">
          <label for="excludeFromSite" class="scrawl">Keep my face off the website</label>
        </p>
      </form>
    </div>  
    <div class="badge-pane">
      <img class="badge-bg" src="/badge/img/blue-badge-bg-2.png">
      <div class="badge-image-then" id="img-preview-then"></div>
      <div class="badge-image-now" id="img-preview-now"></div>
      <div class="badge-label">
        <p class="badge-name">${userData.name || copy.displayName}</p>
      </div>
    </div>  
  </div>  
  `;
}

module.exports = (userData, options = {}) => {
  return page({
    "title" : "Customize your conference badge",
    "content" : form(userData, options),
    "preloadImages": ["/badge/img/blue-badge-bg.png"],
    "scripts": ["form.js"]
  });
};
