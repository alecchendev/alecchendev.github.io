import Head from 'next/head'
import Layout from '../../components/layout'
import styles from '../../styles/blog.module.css';
import Date from '../../components/date';
import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData, getPostData } from '../../lib/posts';


export default function Home({ postData }) {
  return (
    <Layout home selected={''}>
      <Head>
        <title>Blog</title>
      </Head>


      <div className={styles.content} dangerouslySetInnerHTML={{ __html: postData.content }} />
      <Link href='/blog/projects'>Test</Link>

    </Layout>
  )
}

export async function getStaticProps() {
  const postData = await getPostData('blog');
  return {
    props: {
      postData
    }
  }

}