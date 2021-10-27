import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import * as styles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <Layout pageTitle={"Alec Chen - Home"} home>
      <div className={styles.intro}>
        <h1>Hey, I'm Alec.</h1>
        <p>
          I'm a software engineer studying computer science and statistics at UIUC.
          I love to code, write, exercise, and cook.
          This last summer I worked as an emerging tech intern at AbbVie, and this
          summer (2022) I'll be a forward deployed software engineer intern at Palantir.
          I love meeting new people, so feel free to reach out about anything!
        </p>
        <p>
          Email: <a href="mailto:alecchendev@gmail.com" target="_blank">alecchendev@gmail.com</a>
          <br/>
          Twitter: <a href="https://twitter.com/alecchendev" target="_blank">alecchendev</a>
        </p>
      </div>
      <div className={styles.flexh}>
        <div className={styles.homesub}>
          <h2>Writing</h2>
          <p>
            Writing is a great way to organize my thoughts, tell stories,
            and document things. From time to time the things I write will
            make it out of my notes and out onto the web. My more polished
            work is on my <a href="https://mirror.xyz/0x06CcfaB8c54e64BBFEc51c86027b471d4A600923" target="_blank">Mirror</a> and
            the rest is right below.
          </p>

          <ul>
            {allPostsData.map(({ id, date, title }) => (
              <li key={id}>
                <Link href={"/posts/" + id}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>


        <div className={styles.homesub}>
          <h2>Code</h2>
          <p>
            I'm a programmer at heart. Most days I'm either
            working on a side project, or looking for a side project to work on.
            Most of the stuff I work on is public on my <a href="https://github.com/alecchendev" target="_blank">Github</a>.
            The following are some highlights.
          </p>
          <ul>
            <li><a href="https://github.com/IlliniBlockchain/nft-mint" target="_blank">NFT Mint</a></li>
            <li><a href="https://github.com/alecchendev/spotify-social" target="_blank">Spotify Social</a></li>
            <li><a href="https://github.com/alecchendev/spotify-refresh-token" target="_blank">getyourspotifyrefreshtoken.com</a></li>
            <li><a href="https://github.com/alecchendev/spotify-social" target="_blank">3D Engine From Scratch</a></li>
            <li><a href="https://github.com/alecchendev/runner-game" target="_blank">Runner Game</a></li>
            <li><a href="https://github.com/alecchendev/social-network-analysis" target="_blank">Social Network Analysis</a></li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}