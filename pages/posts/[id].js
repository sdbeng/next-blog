import Layout from "../../components/layout"
import {getAllPostIds, getPostData} from '../../lib/posts'
import Head from "next/head"
import Date from "../../components/date"
import utilStyles from '../../styles/utils.module.css'

const Post = ({postData}) => {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />          
            </div>
            <br />
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}></div>

            </article>
        </Layout>
    )
}

export default Post

export async function getStaticProps({ params }){
    // check i've added await when calling getPostData()
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export async function getStaticPaths(){
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}




