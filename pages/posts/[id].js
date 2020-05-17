import Layout from "../../components/layout"
import {getAllPostIds, getPostData} from '../../lib/posts'
import Head from "next/head"
import Date from "../../components/date"

const Post = ({postData}) => {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            {postData.title}
            <br />
            <Date dateString={postData.date} />            
            <br />
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}></div>
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




