# Creatify Studios — Static CMS Website

This version intentionally follows the same structure as the Imperial AC website.
There is no React, Vite, package manager or build command.

## File structure

```text
index.html
work.html
project.html
services.html
about.html
contact.html
admin.html
404.html
css/styles.css
js/site.js
js/cms-config.js
js/admin.js
assets/
supabase-schema.sql
CMS-SETUP.md
README.md
```

## Deploy now

Upload all files to the root of the GitHub repository. In Vercel, import the repository and leave Framework Preset as **Other**. No install command and no build command are required.

The website works immediately with built-in fallback content. Supabase can be connected later.

## Local preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.
