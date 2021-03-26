import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Welcome! I'm <strong>Alec</strong>. I'm a budding software engineer
          and hobbyist filmmaker.
        </p>
        <p>
          Feel free to contact me through <a>email</a> or <a>Twitter</a>.
          I love meeting new people, so don't hesitate to reach out!
        </p>
      </section>
    </Layout>
  )
}