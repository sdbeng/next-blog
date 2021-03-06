## 👋 My Blog
Welcome to my blog!! It's a brand new year and I'm very excited to be working on several projects. 

Lots of improvements on my todo list - but hey! it's the life of a developer!! Happy hacking!!🧰

### Some notes about nextjs
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

## When to Use Static Generation v.s. Server-side Rendering
We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

Marketing pages
Blog posts
E-commerce product listings
Help and documentation
You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use Server-Side Rendering. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.

## Static Generation with and without Data
Static Generation can be done with and without data.

So far, all the pages we’ve created do not require fetching external data. Those pages will automatically be statically generated when the app is built for production.

However, for some pages, you might not be able to render the HTML without first fetching some external data. Maybe you need to access the file system, fetch external API, or query your database at build time. Next.js supports this case — **Static Generation with data — out of the box**.

## Static Generation with Data using getStaticProps
How does it work? Well, in Next.js, when you export a page component, you can also export an async function called getStaticProps. If you do this, then:

getStaticProps runs at build time in production, and…
Inside the function, you can fetch external data and pass that as the props of the page.
```
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```
Essentially, getStaticProps allows you to tell Next.js: “Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!”

Note: In development mode, getStaticProps runs on each request instead.

## getStaticProps Details
You can get in-depth information about getStaticProps in our documentation. But here is some essential information you should know about getStaticProps.

Fetch External API or Query Database
In our lib/posts.js, we’ve implemented getSortedPostsData which fetches data from the file system. But you can fetch the data from other sources, like an external API endpoint, and it’ll work just fine:
```
import fetch from 'node-fetch'

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  return res.json()
}
```
You can also query the database directly:
```
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

This is possible because getStaticProps runs only on the server-side. It will never be run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.

Development vs. Production
In development (npm run dev or yarn dev), getStaticProps runs on every request.
In production, getStaticProps runs at build time.
Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.

Only Allowed in a Page
getStaticProps can only be exported from a page. You can’t export it from non-page files.

One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

What If I Need to Fetch Data at Request Time?
Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In cases like this, you can try Server-side Rendering or skipping pre-rendering.

## Fetching Data at Request Time
If you need to fetch data at request time instead of at build time, you can try Server-side Rendering:

## Pre-rendering and Data Fetching
### Fetching Data at Request Time
If you need to fetch data at request time instead of at build time, you can try Server-side Rendering:

## Server-side Rendering
To use Server-side Rendering, you need to export getServerSideProps instead of getStaticProps from your page.

### Using getServerSideProps
Here’s the starter code for getServerSideProps.
```
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```
Because getServerSideProps is called at request time, its parameter (context) contains request specific parameters. Check docs.

You should use **getServerSideProps** only if you need to pre-render a page whose data must be fetched at request time. Time to first byte (TTFB) will be slower than **getStaticProps** because the server must compute the result on every request, and the result cannot be cached by a CDN without extra configuration.

## Client-side Rendering
If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering):

Statically generate (pre-render) parts of the page that do not require external data.
When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.

This approach works well for user dashboard pages, for example. Because a dashboard is a private, user-specific page, SEO is not relevant, and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching.

## SWR
The team behind Next.js has created a React hook for data fetching called SWR. We highly recommend it if you’re fetching data on the client side. It handles caching, revalidation, focus tracking, refetching on interval, and more. We won’t cover the details here, but here’s an example usage:
```
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```
Check out the SWR documentation to learn more.

## How to Statically Generate Pages with Dynamic Routes
In our case, we want to create dynamic pages for blog posts:

We want each post to have the path `/posts/<id>`, where `<id>` is the name of the markdown file under the top-level posts directory.
Since we have ssg-ssr.md and pre-rendering.md, we’d like the paths to be `/posts/ssg-ssr` and `/posts/pre-rendering`.

First, we’ll create a page called `[id].js` under `pages/posts`. Pages that begin with `[` and end with `]` are dynamic pages in Next.js.


Dynamic Routes
Page Path Depends on External Data
In the previous lesson, we covered the case where the page content depends on external data. We used getStaticProps to fetch required data to render the index page.

In this lesson, we’ll talk about the case where each page path depends on external data. Next.js allows you to statically generate pages with paths that depend on external data. This enables dynamic URLs in Next.js.

Page Path Depends on External Data
How to Statically Generate Pages with Dynamic Routes
In our case, we want to create dynamic pages for blog posts:

We want each post to have the path /posts/<id>, where <id> is the name of the markdown file under the top-level posts directory.
Since we have ssg-ssr.md and pre-rendering.md, we’d like the paths to be /posts/ssg-ssr and /posts/pre-rendering.
Overview of the Steps
We can do this by taking the following steps. You don’t have to make these changes yet — we’ll do it all on the next page.

First, we’ll create a page called [id].js under pages/posts. Pages that begin with [ and end with ] are dynamic pages in Next.js.
### steps
In `pages/posts/[id].js`, we’ll write code that will render a post page — just like other pages we’ve created.
```
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}
```
Now, here’s what’s new: We’ll export an async function called `getStaticPaths` from this page. In this function, we need to return a list of possible values for id.
```
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}
```

Finally, we need to implement `getStaticProps` again - this time, to fetch necessary data for the blog post with a given id. `getStaticProps` is given `params`, which contains `id`.
```
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```

## Dynamic Routes Details
You can get in-depth information about dynamic routes in our documentation:

- Data Fetching
- Dynamic Routes
But here is some essential information you should know about dynamic routes.

## Fetch External API or Query Database
Like getStaticProps, getStaticPaths can fetch data from any data source. In our example, getAllPostIds (which is used by getStaticPaths) may fetch from an external API endpoint:
```
export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  const posts = await res.json()
  return posts.map(post => {
    return {
      params: {
        id: post.id
      }
    }
  })
}
```
Development v.s. Production
In development (npm run dev or yarn dev), getStaticPaths runs on every request.
In production, getStaticPaths runs at build time.
## Fallback
Recall that we returned fallback: false from getStaticPaths. What does this mean?

If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.

If fallback is true, then the behavior of getStaticProps changes:

The paths returned from getStaticPaths will be rendered to HTML at build time.
The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
In the background, Next.js will statically generate the requested path. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.
This is beyond the scope of our lessons, but you can learn more about fallback: true in our documentation.

## Catch-all Routes
Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. For example:

pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.
If you do this, in getStaticPaths, you must return an array as the value of the id key like so:
```
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c']
    }
  }
  //...
]
```
And params.id will be an array in getStaticProps:
```
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
```
Take a look at our Dynamic Routes documentation to learn more.

## Router
If you want to access the Next.js router, you can do so by importing the useRouter hook from next/router. Take a look at our router documentation to learn more.

404 Pages
To create a custom 404 page, create pages/404.js. This file is statically generated at build time.
```
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```
Take a look at our Error Pages documentation to learn more.

### More Examples
We have created several examples to illustrate getStaticProps and getStaticPaths — take a look at their source code to learn more:

Blog Starter using markdown files (Demo)
DatoCMS Example (Demo)
TakeShape Example (Demo)
Sanity Example (Demo)

## deploying
How to deploy your Next.js app to Vercel.
The DPS Workflow: Develop, Preview, and Ship.
How to deploy your Next.js app to your own hosting provider.