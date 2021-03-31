import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/index.module.css';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import Link from 'next/link';
import Image from 'next/image';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
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
            I'm a <Link href='/projects'><a>software engineer</a></Link> and <Link href='/projects'><a>hobbyist filmmaker</a></Link>.
          </h1>

          <h2 className={styles.subheading}>
            
            Feel free to contact me through <a href='mailto:alecchendev@gmail.com' target='_blank'>email </a>
            or <a href='https://twitter.com/alecchendev' target='_blank'>Twitter</a>. I love meeting new
            people, so don't hesitate to reach out!
          </h2>
          

        </div>
        <img className={styles.profileImg} src={'./images/profileAlt.png'}/>
        {/* <Image
          priority
          src="/images/profileAlt.png"
          className={utilStyles.borderCircle}
          height={144}
          width={144}
          alt={name}
        /> */}
      </div>

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