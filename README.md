# Eslam & Basant — Wedding Invitation

A single-page wedding invitation site with a hero section, countdown timer,
event details, location link, and an RSVP form.

## Structure

```
wedding-invitation/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js        # scroll-in reveal animations
│   ├── countdown.js   # live countdown to the wedding date/time
│   └── rsvp.js        # RSVP form submission handler
├── images/
│   └── couple.png
└── README.md
```

## Setup

1. **Countdown date** — set in `js/countdown.js`:
   ```js
   const weddingDate = new Date("July 24, 2026 20:00:00").getTime();
   ```
2. **RSVP endpoint** — `js/rsvp.js` posts the form to a Google Apps Script
   Web App URL. Replace the placeholder before going live:
   ```js
   const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";
   ```
   Until this is set to a real deployed Apps Script URL, RSVP submissions
   will fail.
3. **Location link** — the "View Location" button in `index.html` points to
   a Google Maps link; update the `href` if the venue changes.

## Notes

- Fonts (Great Vibes, Inter, Noto Naskh Arabic) and Bootstrap Icons are
  loaded from CDNs in `index.html`, so an internet connection is required
  for full styling.
- The page is responsive down to small mobile widths (breakpoints at 768px
  and 500px in `style.css`).
