# Some commands to start everything in development

## Launch dev server

You can launch a dev server of a wiki by using `npm run dev wikis/name-of-wiki`, e.g. `npm run dev wikis/lootjs` if you want to launch lootjs.
After the dev server builds it will print out the link to the dev server.
Updating the markdown files will automatically update the dev server.

You can run multiple dev servers at a time.

## Build specific wiki

You can build a specific wiki by using `npm run build wikis/name-of-wiki`, e.g. `npm run build wikis/lootjs` if you want to build lootjs.

## Static dev server

With `npm run serve:static` you can start a static server to test the full wiki. The static server does not automatically updates when you update the markdown files.

## Build the wiki

With `npm run build:static` you can build the full wiki
