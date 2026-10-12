# Salubri - grocery food-safety quick reference

A responsive Angular 21 application with French and English summaries of the
supplied Quebec food hygiene and safety guide, 2018 edition.

## Run locally

Requires Node.js 22.12+ (Node 22.20 was used) and npm.

```powershell
npm install
npm start
```

Open http://localhost:4200. No API, account or remote fonts are required. The
question workflow opens ChatGPT in a new tab only when you choose to; prompts and
answers are copied and pasted manually.

## Features

- Desktop sidebar, tablet two-column cards and phone single-column cards.
- French/English language switch, including translated reference content.
- Accent-tolerant, partial-term and broad search across both languages, steps,
  keywords, page numbers and the cooking table. Results link directly to cited
  PDF pages; the complete 36-page guide can also be opened and searched with
  Ctrl+F/⌘F.
- Categories, expandable instructions and source PDF page links.
- Favourites and language saved in this browser's local storage. Storage failures
  are reported; preferences then continue in memory for the current visit.
- Ask ChatGPT a question by creating and copying a prompt, opening ChatGPT,
  pasting its answer back into the app, then saving the answers you want to keep.
  The knowledge base is stored in this browser and entries can be deleted.
- The form explains the workflow in three steps and clarifies that an image link
  in the response does not embed the image; attach the image file or paste the
  image itself.
- The knowledge base is shown as a table with a link to expand each answer's
  details. Up to five JPEG, PNG or WebP images can be selected together or pasted
  into the answer field. Place the cursor where an image should appear: a marker
  such as `[Image 1]` is inserted while editing and replaced by the image in the
  saved entry's details. Images are resized before storage. Each entry can also
  be shared via WhatsApp or email; sharing includes the question and answer, but
  not the images.
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
permission to distribute the supplied document. Preferences and the knowledge
base are stored only on this device; clearing browser storage removes them.
Questions and answers are not sent by the app. If you copy a prompt into ChatGPT,
that content is submitted to the external service under its own terms and privacy
settings.

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
