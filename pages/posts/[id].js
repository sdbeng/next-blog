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
        </Layout>
    )
}

export default Post

export async function getStaticProps({ params }){
    const postData = getPostData(params.id)
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




