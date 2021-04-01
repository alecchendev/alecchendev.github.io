import Layout from '../components/layout';
import Head from 'next/head';
import styles from '../styles/page.module.css';
import { getProjectsData } from '../lib/projects';
import Projects from '../components/projects';


export default function ProjectsPage({ projectsData }) {
    
	return (
		<Layout>
			<Head>
				<title>Projects</title>
			</Head>
			<div className={styles.headerContainer}>
			<h1 className={styles.header}>
				Projects
			</h1>
			<p className={styles.subheader}>
				I love to code, so sometimes I'll do a bit on my own time. This is a collection of
				miscellaneous personal and group projects I've made in my free time.
			</p>

			</div>
			<Projects projectsData={projectsData} />
			
		</Layout>

	)
}

export async function getStaticProps(context) {
  const projectsData = getProjectsData();
  return {
    props: {
      projectsData
    }
  }

}