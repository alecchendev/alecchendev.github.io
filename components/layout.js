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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <header className={styles.header}>
        {/* {home ? (
          <>
            <Image
              priority
              src="/images/profile.png"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
          </>
        )} */}
      </header>

      <main>{children}</main>

      
    </div>
  )
}