import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/index.module.css';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import Link from 'next/link';
import Image from 'next/image';
import { getProjectsData } from '../lib/projects';
import Projects from '../components/projects';
import Videos from '../components/videos';
import { getVideosData } from '../lib/videos';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const projectsData = getProjectsData();
  const videosData = getVideosData();
  return {
    props: {
      allPostsData,
      projectsData,
      videosData
    }
  }
}

export default function Home({ allPostsData, projectsData, videosData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={styles.landingContainer}>
        <div className={styles.headingContainer}>

          <h1 className={styles.heading}>
            Hey! I'm Alec.
            <br/>
            I'm a <Link href='/projects'><a>software engineer</a></Link> and
            <Link href='/videos'><a> hobbyist filmmaker</a></Link>.
          </h1>

          <h2 className={styles.subheading}>
            Feel free to contact me through <a href='mailto:alecchendev@gmail.com' target='_blank'>email </a>
            or <a href='https://twitter.com/alecchendev' target='_blank'>Twitter</a>. I love meeting new
            people, so don't hesitate to reach out!
          </h2>

        </div>
        <img className={styles.profileImg} src={'./images/profileAlt.png'}/>
      </div>

      {false && (<>
      <div id='projects' className={styles.sectionContainer}>
        <div className={styles.sectionHeaderContainer}>
          <h1 className={styles.sectionHeader}>Projects</h1>
        </div>
        <Projects projectsData={projectsData} />
      </div>

      <div id='videos' className={styles.sectionContainer}>
        <div className={styles.sectionHeaderContainer}>
          <h1 className={styles.sectionHeader}>Videos</h1>
        </div>
        <Videos videosData={videosData} />
      </div>
      </>
      )}

      {false &&
      <div className={styles.navContainer}>
        <section className={styles.sectionContainer}>
          <h2 className={utilStyles.headingLg}>Featured</h2>
          <Link href={`/projects`}>
            <a>Projects</a>
          </Link>
        </section>
        <section className={styles.sectionContainer}>
          <h2 className={utilStyles.headingLg}>Explore</h2>
          <Link href={`/music`}>
            <a>What I'm Listening To</a>
          </Link>
        </section>
        <section className={utilStyles.sectionContainerLg}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </div>
      }
      
    </Layout>
  )
}