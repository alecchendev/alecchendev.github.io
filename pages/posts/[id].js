import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import styles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout pageTitle={postData.title}>
      <h1 className={styles.postTitle}>{postData.title}</h1>
      <p className={styles.postDate}>{postData.date}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }

export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id)
	return {
		props: {
			postData
		}
	}
}