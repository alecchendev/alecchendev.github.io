import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Alec Chen';
export const siteTitle = 'Alec Chen';

export default function Layout({ children, home, skinny }) {
  return (
    <div className={(home && styles.padTop) + ' ' + (skinny ? styles.skinnyContainer : styles.container)}>
      <Head>
        <script src="https://kit.fontawesome.com/98bcd674c2.js" crossorigin="anonymous"></script>
      </Head>

      <header className={styles.header}>
        <div className={styles.left}>
          <Link href='/'>
            <div className={styles.navItem}>
              Alec Chen
            </div>
          </Link>
        </div>
        <div className={styles.right}>
          <Link href='projects'>
            <div className={styles.navItem}>
              Projects
            </div>
          </Link>
          <Link href='videos'>
            <div className={styles.navItem}>
              Videos
            </div>
          </Link>
        </div>
      </header>

      <main className={styles.content}>{children}</main>

      <footer className={styles.footer}>
        
      </footer>

      
    </div>
  )
}