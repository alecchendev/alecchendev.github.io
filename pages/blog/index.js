import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date';
import Link from 'next/link';
import { getSortedPostsData, getPostData } from '../../lib/posts';

const postsDirectory = process.cwd() + '/blog'

export default function Home({ postData }) {
  return (
    <Layout home selected={''}>
      <Head>
        <title>Blog</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: postData.content }} />

    </Layout>
  )
}

export async function getStaticProps() {
  const postData = await getPostData(postsDirectory, 'index');
  return {
    props: {
      postData
    }
  }

}