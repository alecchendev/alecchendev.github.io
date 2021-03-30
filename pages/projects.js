import Layout from '../components/layout';
import Head from 'next/head';
import styles from '../styles/projects.module.css';
import { getProjectsData } from '../lib/projects';


export default function Projects({ projectsData }) {
    
	return (
		<Layout>
			<Head>
				<title>Projects</title>
			</Head>
			<h1>
				Projects
			</h1>
			{projectsData &&
			projectsData.map(item => {
				return (<div className={styles.container} key={item.title}>
					<img className={styles.image} alt={item.alt} src={item.imgSrc}/>
					<div className={styles.infoContainer}>
						<h2 className={styles.title}>{item.title}</h2>
						<h3 className={styles.stack}>{item.stack}</h3>
						<p className={styles.description}>{item.description}</p>
					</div>
				</div>)
			})}
			
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