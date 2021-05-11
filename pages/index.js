import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import styles from '../styles/index.module.css';
import Date from '../components/date';
import Link from 'next/link';
import { getSortedPostsData, getPostData } from '../lib/posts';

const postsDirectory = process.cwd() + '/main'

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
  const postData = await getPostData(postsDirectory, 'index');
  return {
    props: {
      postData
    }
  }

}