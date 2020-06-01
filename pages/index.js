import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'
import Date from '../components/date'

export async function getStaticProps(){
  const allPostsData = getSortedPostsData()
  return {
    props:{
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="p-4 shadow rounded bg-aqua">
        <p className="text-purple-500">Hello, I'm Serg ⚽️</p>
        <p>I'm a Full Stack Developer living in Concord,CA. I develop custom web and mobile apps for business and non-profit organizations. </p>
        <p>On my free time, I like bike riding, swimming and playing chess with my son. 
        Contact me on Twitter at <span><a href="https://twitter.com/sergb_appdev">sergb_appdev</a></span> </p>
        
      </section>
      <div>
      <img className="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover sm:object-center lg:hidden" src="/images/summer-beach.jpg" alt="worrking from the beach" />
      </div>

      <section className={utilStyles.headingMd}>

      </section>
      <section>
        <h2 className="m-4 h-6 text-2xl text-indigo-900">Blog</h2>
        <ul className="list-none">
        {
          allPostsData.map(({id, date, title}) => (
            <li className="text-lg text-indigo-500" key={id}>
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
              <br />
              <small className="text-sm text-gray-600">
                <Date dateString={date}/>
              </small>
             
            </li>
          ))
        }
        </ul>
      </section>
      {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
      </section> */}
    </Layout>
  )
}
