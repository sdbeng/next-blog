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