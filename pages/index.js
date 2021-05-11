import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import styles from '../styles/index.module.css';
import Date from '../components/date';
import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData, getPostData } from '../lib/posts';

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

export default function Home({ postData }) {
  return (
    <Layout home selected={''}>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={styles.content} dangerouslySetInnerHTML={{ __html: postData.content }} />

    </Layout>
  )
}

export async function getStaticProps() {
  const postData = await getPostData('index');
  return {
    props: {
      postData
    }
  }

}