import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import styles from '../styles/index.module.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link';
import { parseISO, format } from 'date-fns'
import { getSortedPostsData, getPostData } from '../lib/posts';

const postsDirectory = process.cwd() + '/main'

export default function Home({ postData }) {

  const [lastUpdated, setLastUpdated] = useState('Loading...');

  useEffect(() => {
    const getRepoData = async () => {
      const repoData = await axios({
        method: 'get',
        url: 'https://api.github.com/repos/alecchendev/alecchendev.github.io',
        headers: {'Accept': 'application/vnd.github.v3+json'}
      });
      const dateString = repoData.data.updated_at;
      const formatted = format(parseISO(dateString), 'LLLL d, yyyy')
      setLastUpdated(formatted);
    }
    getRepoData();
  }, [])

  return (
    <Layout home selected={''}>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={styles.content} dangerouslySetInnerHTML={{ __html: postData.content }} />

      <p className={"date"}>Last updated: {lastUpdated}</p>

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