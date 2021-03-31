import styles from '../styles/videos.module.css';

export default function Videos({ videosData }) {
	return (
		<div className={styles.container}>
			{videosData &&
			videosData.map(item => {
				return (
					<div className={styles.videoWrapper}>
						<iframe className={styles.embed} src="https://www.youtube.com/embed/Hfr-e13av5I" allow="fullscreen;"
						></iframe>
					</div>
				);
			})}
			
		</div>
	)
}