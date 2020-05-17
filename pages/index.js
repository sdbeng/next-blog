import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>Hello, I'm Serg ⚽️</p>
        <p>I'm a Full Stack Developer living in Concord,CA. I develop custom web and mobile apps for business and non-profit organizations. Contact me on Twitter at <span><a>sergdb_dev</a></span> </p>
      </section>
    </Layout>
  )
}
