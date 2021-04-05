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
				I'm a huge movie/tv buff and I've recently began my own
				journey as a filmmaker. I've had the aspirations to make my
				own films for a while, and so I'm finally giving it a fair shot.
				Just trying to enjoy the process and make things I find cool.
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