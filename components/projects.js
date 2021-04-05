import styles from '../styles/projects.module.css';
import { FaGithub, FaMedium } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

export default function Projects({ projectsData }) {
    
	return (
		<>
			{projectsData &&
			projectsData.map(item => {
				return (<div className={styles.container} key={item.title}>
					<img className={styles.image} alt={item.alt} src={item.imgSrc}/>
					<div className={styles.infoContainer}>
						<h2 className={styles.title}>{item.title}</h2>
						<h3 className={styles.stack}>{item.stack}</h3>
						<p className={styles.description}>{item.description}</p>
						<div className={styles.links}>
							{item.github && <a className={styles.icon} href={item.github} target="_blank"><FaGithub/></a>}
							{item.link && <a className={styles.icon} href={item.link} target="_blank"><FiExternalLink/></a>}
							{item.medium && <a className={styles.icon} href={item.medium} target="_blank"><FaMedium/></a>}
						</div>
					</div>
				</div>)
			})}
		</>
	)
}