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
				Coding is not just my career but a hobby of mine. I like working
				on projects I'm interested in, and side projects can be a nice way
				to learn new things and play around with different tools and stacks.
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