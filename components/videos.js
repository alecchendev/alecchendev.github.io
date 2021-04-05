import styles from '../styles/videos.module.css';

export default function Videos({ videosData }) {
	return (
		<div className={styles.container}>
			{videosData &&
			videosData.map(item => {
				return (
					<div className={styles.videoContainer}>
					<div className={styles.videoWrapper} key={item.title}>
						<iframe className={styles.embed} src={item.link} allow="fullscreen;"
						></iframe>
					</div>
					<h2 className={styles.title}>{item.title}</h2>
					<p className={styles.description}>{item.description}</p>
					</div>
				);
			})}
			
		</div>
	)
}