import * as React from 'react'
import { Link } from 'gatsby'
import * as styles from '../styles/layout.module.css';

const Layout = ({ pageTitle, children }) => {
  return (
    <div className={styles.wrapper}>
      <title>{pageTitle}</title>
      <nav>
        <div className={styles.nav}>
            <div className={[styles.leftnav, styles.navsub].join(' ')}>
                <a href="/" className={styles.navlink}>
                    Alec Chen
                </a>
            </div>
            <div className={[styles.rightnav, styles.navsub].join(' ')}>
                <a href="/about" className={styles.navlink}>
                    About
                </a>
                <a href="/writing" className={styles.navlink}>
                    Writing
                </a>
            </div>
        </div>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout