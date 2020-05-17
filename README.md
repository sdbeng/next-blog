## Starter
This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## summary
- Next.js automatically optimizes your application for the best performance by code splitting, client-side navigation, and prefetching (in production).
- You create routes as files under pages and use the built-in Link component. No routing libraries are required.

**Note:** If you need to link to an external page outside the Next.js app, just use an <a> tag without Link.

If you need to add attributes like, for example, className, add it to the a tag, not to the Link tag.

## so far:

To use CSS Modules, import a CSS file named *.module.css from any component.
To use global CSS, import a CSS file in pages/_app.js.

**tip** Make sure you restart the development server when you add _app.js.

## data-fetching
### pre-rendering
If your app is a plain React.js app (without Next.js), there’s no pre-rendering, so you won’t be able to see the app if you disable JavaScript. Instead you'll see "You need to enable JavaScript to run this app." This is because the app is not pre-rendered into static HTML.

## Two Forms of Pre-rendering
Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.

Static Generation is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
Server-side Rendering is the pre-rendering method that generates the HTML on each request.

## Per-page Basis
Importantly, Next.js lets you choose which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.