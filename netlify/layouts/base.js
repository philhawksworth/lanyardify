const og = (data) => {

  const rootURL = "https://lanyardify.netlify.app/";
  const badge = data.badgeNumber || "";

  return `
  <meta property="og:title" content="Jamstack Conf 2021">
  <meta property="og:site_name" content="Jamstack.org">
  <meta property="og:url" content="${rootURL}badge/${badge}">
  <meta property="og:description" content="Got my ticket for Jamstack Conf 2021">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${rootURL}og/badge/${badge}">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${rootURL}badge/${badge}">
  <meta property="twitter:title" content="Jamstack Conf 2021">
  <meta property="twitter:description" content="Got my ticket for Jamstack Conf 2021">
  <meta property="twitter:image" content="${rootURL}og/badge/${badge}">
  `;
}



module.exports = (data) => {
  
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      ${(data.preloadImages || []).map(imageUrl => {
        return `<link rel="preload" as="image" href="${imageUrl}"></link>`;
      }).join("")}
      <link rel="stylesheet" href="/badge/style.css">
      <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap" rel="stylesheet">
      <title>${data.title}</title>
      ${og(data)}
    </head>
    <body>
      ${data.content}

      ${(data.scripts || []).map(script => {
        return `<script src="/badge/js/${script}"></script>`;
      }).join("")}

      <script>
        !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
        },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
        a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
        // Insert Twitter Pixel ID and Standard Event data below
        twq('init','o6prl');
        twq('track','PageView');
      </script>
      <script type="text/javascript"> _linkedin_partner_id = "1432825"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id); </script>
      <script type="text/javascript"> (function(l) { if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]} var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})(window.lintrk); </script>
      <noscript> <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=1432825&fmt=gif" /> </noscript>
    </body>
  </html>
  `;
};
