import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import styles from '../styles/index.module.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link';
import { parseISO, format } from 'date-fns'
import { getSortedPostsData, getPostData } from '../lib/posts';

const postsDirectory = process.cwd() + '/main'

export default function Home({ postData, lastUpdated, message }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name='description' content={postData.description} />
      </Head>

      <div className={styles.content} dangerouslySetInnerHTML={{ __html: postData.content }} />

      <p className={"date"}>
        Last updated: {lastUpdated}
        <br/>
        Last commit: {message}
      </p>

    </>
  )
}

export async function getStaticProps() {
  const postData = await getPostData(postsDirectory, 'index');

  const repoData = await axios({
    method: 'get',
    url: 'https://api.github.com/repos/alecchendev/alecchendev.github.io',
    headers: {'Accept': 'application/vnd.github.v3+json'}
  });
  const dateString = repoData.data.updated_at;
  const formattedDate = format(parseISO(dateString), 'LLLL d, yyyy')

  const commitData = await axios({
    method: 'get',
    url: 'https://api.github.com/repos/alecchendev/alecchendev.github.io/commits/master',
    headers: {'Accept': 'application/vnd.github.v3+json'}
  });
  // console.log(commitData)
  const message = commitData.data.commit.message;

  return {
    props: {
      postData,
      lastUpdated: formattedDate,
      message
    }
  }

}