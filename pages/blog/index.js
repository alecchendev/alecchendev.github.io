import Head from 'next/head'
import Layout from '../../components/layout'
import Link from 'next/link';
import { getSortedPostsData, getPostData } from '../../lib/posts';

const postsDirectory = process.cwd() + '/blog'

export default function Home({ postData, sortedPostsData }) {
  console.log(sortedPostsData)
  return (
    <Layout home selected={''}>
      <Head>
        <title>Blog</title>
      </Head>

      <h1>Blog</h1>
      <p>
        A means for me to share things I find interesting that don't quite
        fit into the 280 character limit.
      </p>

      <h3>Recent</h3>
      <ul>
        {sortedPostsData.map(({ id, title, date }) => <li><Link href={'/blog/' + id}>{title}</Link></li>)}
      </ul>

      <div dangerouslySetInnerHTML={{ __html: postData.content }} />

    </Layout>
  )
}

export async function getStaticProps() {
  const postData = await getPostData(postsDirectory, 'index');
  const sortedPostsData = await getSortedPostsData(postsDirectory);
  sortedPostsData.pop();
  return {
    props: {
      postData,
      sortedPostsData
    }
  }

}