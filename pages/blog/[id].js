import Layout from '../../components/layout';
import Head from 'next/head';
import styles from '../../styles/blog.module.css';
import { parseISO, format } from 'date-fns'
import { getAllPostIds, getPostData } from '../../lib/posts';

const postsDirectory = process.cwd() + '/blog'

export default function Post({ postData }) {
  return (
  <>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <article>
      <h1>{postData.title}</h1>
      <p className={"date"}>{format(parseISO(postData.date), 'LLLL d, yyyy')}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
    </article> 
  </>
  )
}

export async function getStaticPaths() {
  console.log(process.cwd());
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