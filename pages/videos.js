import Layout from '../components/layout';
import Head from 'next/head';
import styles from '../styles/page.module.css';
import { getVideosData } from '../lib/videos';
import Videos from '../components/videos';


export default function VideosPage({ videosData }) {
    
	return (
		<Layout>
			<Head>
				<title>Videos</title>
			</Head>
			<div className={styles.headerContainer}>
			<h1 className={styles.header}>
				Videos	
			</h1>
			<p className={styles.subheader}>
				I've recently made the committment to myself to give my
				long-standing creative aspirations for film a fair shot. Although
				I'm still in my very early stages and what you may see is pretty
				mediocre, I've gotta start somewhere. Come back in a year and
				see if I've kept my promise.
			</p>

			</div>
			<Videos videosData={videosData} />
			
		</Layout>

	)
}

export async function getStaticProps(context) {
  const videosData = getVideosData();
  return {
    props: {
      videosData
    }
  }

}