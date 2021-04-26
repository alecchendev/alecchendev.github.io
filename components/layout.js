import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const name = 'Alec Chen';
export const siteTitle = 'Alec Chen';

export default function Layout({ children, home, skinny, selected }) {
  return (
    <div className={(home && styles.padTop) + ' ' + (skinny ? styles.skinnyContainer : styles.container)}>
      <Head>
        <script src="https://kit.fontawesome.com/98bcd674c2.js" crossorigin="anonymous"></script>
      </Head>

      <header className={styles.header}>
        <div className={styles.left}>
          <Link href='/'>
            <div className={styles.navItem + ' ' + (selected == '' && styles.selected)}>
              Alec Chen
            </div>
          </Link>
        </div>
        <div className={styles.right}>
          <Link href='projects'>
            <div className={styles.navItem + ' ' + (selected == 'projects' && styles.selected)}>
              Projects
            </div>
          </Link>
          <Link href='videos'>
            <div className={styles.navItem + ' ' + (selected == 'videos' && styles.selected)}>
              Videos
            </div>
          </Link>
        </div>
      </header>

      <main className={styles.content}>{children}</main>

      <footer className={styles.footer}>
        <a className={styles.icon} href={'https://github.com/alecchendev'} target="_blank"><MdEmail/></a>
        <a className={styles.icon} href={'mailto:alecchendev@gmail.com'} target="_blank"><FaGithub/></a>
        <a className={styles.icon} href={'https://twitter.com/alecchendev'} target="_blank"><FaTwitter/></a>
        {/* <a className={styles.icon} href={item.medium} target="_blank"><FaMedium/></a> */}
      </footer>

      
    </div>
  )
}