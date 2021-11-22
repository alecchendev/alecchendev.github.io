import Link from "next/link"
import Head from "next/head"
import * as styles from "../styles/layout.module.css"

const Layout = ({ pageTitle, home, children }) => {
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className={[styles.master].join(' ')}>
        <div className={styles.wrapper + ' ' + (home ? styles.homeWidth : styles.postWidth)}>
          <div className={styles.content}>
            {
              !home &&
              (
                <div className={styles.backLink}><Link href="/">Alec Chen</Link></div>
              )
            }
            
            {children}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Layout