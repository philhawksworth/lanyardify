# Lanyardify

Generate custom conference badges which we hope people will share online for Jamstack Conf 2021

https://lanyardify.netlify.app/


## Overview

This site provides:

- A form (badge-make) which a user can upload 2 images and associate them with their ticket number. If a [ticket number is included in the URL](https://lanyardify.netlify.app/badge/make/12345) it will be autopopulated in the form, and we can also fetch their display name for that ticket from Tito too. Otherwise they can manually add their ticket number.
- A function (badge-save) to persist the provided images with Cloudinary, and all the required badge data to a database within Supabase
- An ODB function (badge-view) to render [a page to show the badge](https://lanyardify.netlify.app/badge/EOChQDCEjhXb) populating it with data fetched from supabase according to the badge URL
- A function (badge-og) to format requests to cloudinary to generate [a fancy OG image](https://lanyardify.netlify.app/og/badge/EOChQDCEjhXb) for any given badge page


## Notes

- local testing using `ntl dev` seems to struggle to parse the multipart form, so testing needs to happen in the netlify build until that is resolved.
- the `www/badge` directory holds assets in the used by the views
- the html files in `www` are for testing and development convenience only, and not used by the site


## Moderation

If any badge pages are reported as inappropriate (via email link on all badge pages to `community@jamstack.org`) they can be excluded via this moderation site:

https://jamstack-conf-admin.netlify.app/


- This utility retains the data in the database, but flags a badge URL as banned and will not render in future.
- After flagging a badge URL as inappropriate, a redeploy is required to purge the ODB rendered badge pages from the CDN
- Moderation page also lists all banned URLs and their associated ticket number
