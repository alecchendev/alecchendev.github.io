import * as React from 'react'
import { Link } from 'gatsby'
import * as styles from '../styles/layout.module.css';

const Layout = ({ pageTitle, bgcolor, children }) => {
  return (
    <div className={[styles.master, bgcolor].join(' ')}>
      <div className={styles.wrapper}>
        <title>{pageTitle}</title>
        <nav>
          <div className={styles.nav}>
              <div className={[styles.leftnav, styles.navsub].join(' ')}>
                  <Link to="/" className={styles.navlink}>
                      Alec Chen
                  </Link>
              </div>
              <div className={[styles.rightnav, styles.navsub].join(' ')}>
                  <Link to="/about" className={styles.navlink}>
                      About
                  </Link>
                  <Link to="/projects" className={styles.navlink}>
                      Projects
                  </Link>
                  <Link to="/writing" className={styles.navlink}>
                      Writing
                  </Link>
              </div>
          </div>
        <hr />
        </nav>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout