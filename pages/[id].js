import Layout from '../components/layout';
import Head from 'next/head';
import Date from '../components/date';
import { getAllPostIds, getPostData } from '../lib/posts';

const postsDirectory = process.cwd() + '/main'

export default function Post({ postData }) {
  return (
  <Layout skinny>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <article>
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
    </article> 
  </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds(postsDirectory);
  return {
    paths,
    fallback: false
  }

}

export async function getStaticProps({ params }) {
  const postData = await getPostData(postsDirectory, params.id);
  return {
    props: {
      postData
    }
  }

}