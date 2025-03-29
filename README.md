# greenwood-dynamic-pages-and-layouts-repros

## Overview

Some observations and reproductions of some inconsistent (although technically expected) behaviors of dynamic pages and layouts with Greenwood.

## Setup

1. Clone the repo
1. Have latest NodeJS LTS installed (or run `nvm use`)
1. Run `npm ci`

## Observations

### "Top Level" pages bypass default page layout

With this file-based routing (could be _page.js_ or _page.html_), no content from the default page layout will be used

```sh
src/
  layouts/
    app.html
    page.js
  pages/
    index.html
```

The output from _page.js_ is missing, but we do get `<title>` from the page, and `<p>App Layout</p>` from _app.html_
```html
<!DOCTYPE html>
<html lang="en" prefix="og:http://ogp.me/ns#">
  <head>
    <link rel="modulepreload" href="/logo.BFrUFcm8.js" as="script" />
    <title>Greenwood</title>

    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="icon" href="/favicon.ico" />

    <script type="module" src="/logo.BFrUFcm8.js"></script>
  </head>
  <body>
    <p>App Layout</p>

    <main>
      <h1>Welcome to Greenwood!</h1>
    </main>
  </body>
</html>
```

### "Top Level" pages bypass custom page layouts

Same as above, instead using layout frontmatter in _blog.html_, but now using a custom layout defined in frontmatter.

```sh
src/
  layouts/
    app.html
    blog.js
  pages/
    blog.html
```

The contents of _layouts/blog.js_ are not seen in the output, but we do get the app layout contents.
```html
<!DOCTYPE html>
<html>
  <head>
    <title>App Layout</title>
  </head>
  <body>
    <p>App Layout</p>

    <h2>Welcome to the blog page!</h2>
  </body>
</html>
```

> Note: If it was _layouts/blog.js it might work?

### Dynamic Pages with custom `<head>` tags are not merged


In this case, all the content is there...

```sh
src/
  layouts/
    app.html
    page.js
  pages/
    about.js
```

But we can see the page level `<head>` tags are not getting merged.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Layout</title>
  </head>
  <body>
    <p>App Layout</p>

    <p>Page Layout</p>
    <html>
      <head>
        <title>About Page</title>
      </head>
      <body>
        <h2>About Page</h2>
      </body>
    </html>
  </body>
</html>
```

### WCC Warnings

Maybe its own standalone issue, and seems expected, but we are getting this message from WCC with dynamic layouts
```sh
WARNING: customElement <page-outlet> is not defined.  You may not have imported it.
WARNING: customElement <content-outlet> is not defined.  You may not have imported it.
```

Not sure if we should change this placeholder or we're not merging soon enough, or whatnot?

## Thoughts

- _.html_ pages are specifically hardcoded for, so maybe we just need to move this condition to the end?  That's probably why _about.js_ works, but _index.html_ does not work for page layouts
- Should Greenwood even provided custom content? - 
- We seem to have a gap in our hierarchy of `app layout -> default page layout -> custom page layout -> page`.