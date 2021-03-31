import styles from '../styles/projects.module.css';

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
					</div>
				</div>)
			})}
		</>
	)
}