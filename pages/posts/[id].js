import Layout from "../../components/layout"
import {getAllPostIds, getPostData} from '../../lib/posts'

const Post = ({postData}) => {
    return (
        <Layout>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
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




