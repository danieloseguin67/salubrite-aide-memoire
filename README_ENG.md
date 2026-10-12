# Salubri - grocery food-safety quick reference

A responsive Angular 21 application with French and English summaries of the
supplied Quebec food hygiene and safety guide, 2018 edition.

## Run locally

Requires Node.js 22.12+ (Node 22.20 was used) and npm.

```powershell
npm install
npm start
```

Open http://localhost:4200. No API, account, remote fonts or third-party services
are required.

## Features

- Desktop sidebar, tablet two-column cards and phone single-column cards.
- French/English language switch, including translated reference content.
- Accent-insensitive search across both languages, steps and the cooking table.
- Categories, expandable instructions and source PDF page links.
- Favourites and language saved in this browser's local storage. Storage failures
  are reported; preferences then continue in memory for the current visit.
- Printing includes the full details of the currently filtered cards. Reset
  filters before printing to include all cards.
- Keyboard-accessible controls, skip link and visible focus indicators.

## Source and safety

The content in [guide.ts](src/app/guide.ts) is an original summary, not a full
transcription or official translation. Each card identifies the source pages.
Cooking temperatures and cooling limits were checked against the scanned tables.
The original [source.pdf](source.pdf) is served unchanged by the Angular asset
configuration and remains the authoritative source for these summaries.

This app is a reference aid, not training, medical advice, a safety certification
or a compliance log. The source is from 2018: confirm current regulations and
store procedures with your supervisor, particularly for labelling, illness
exclusion and higher-risk processes. English translations are unofficial.

The PDF is included in the build. Before publishing publicly, confirm you have
permission to distribute the supplied document. Preferences are stored only on
this device; clearing browser storage removes them.

There is no offline service worker: an already loaded page can filter its bundled
reference content without more requests, but reopening the app and opening PDF
pages require connectivity.

## Validate and build

```powershell
npm test -- --watch=false
npm run build
```

The production files are generated in `dist\salubrite-des-aliments\browser`.
Serve them using a static web server. For access from a phone on a trusted local
network, run `npm start -- --host 0.0.0.0`, permit the appropriate firewall access,
and open `http://YOUR-PC-LAN-IP:4200` on the phone. Do not expose the development
server to the public internet.

## Updating the guide

Update both languages, the cooking rows, page references and tests when the
source changes. PDF page links use 1-based physical PDF pages; some mobile PDF
viewers may not honour the page fragment. The guide's printed page numbers match
the referenced PDF pages in this edition.
