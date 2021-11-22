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
          I'm a software engineer studying computer science and
          statistics at UIUC. I'm interested in nutrition, programming,
          web3, film, and writing.
        </p>
        <p>
          Currently working on various projects as a founding member of Illini
          Blockchain. Most recently worked on a side project, weavewrite, to play around
          with Arweave for a possible submission to their Open Web Hackathon.
          In the midst of learning Solana development. Branching into DeFi.
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
            and document things. Occasionally things I write will graduate beyond my notes and out onto the web. My more polished
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
            <li><a href="https://6uqwm4yb52afiiycvjrh3itn7iiddaqdobya7f6oqi6unjmudacq.arweave.net/9SFmcwHugFQjAqpifaJt-hAxggNwcA-XzoI9RqWUGAU/#/" target="_blank">weavewrite</a></li>
            <li><a href="https://illini-mint.vercel.app/" target="_blank">NFT Mint</a></li>
            <li><a href="https://my-spotify-social.herokuapp.com/" target="_blank">Spotify Social</a></li>
            <li><a href="https://github.com/alecchendev/spotify-refresh-token" target="_blank">Spotify Refresh Token</a></li>
            <li><a href="https://github.com/alecchendev/runner-game" target="_blank">Runner Game</a></li>
            <li><a href="https://blog.devgenius.io/how-i-built-a-basic-3d-graphics-engine-from-scratch-a54df82031f3?sk=8c0d8ceb7da3e19e73c0175d988befc5" target="_blank">3D Engine From Scratch</a></li>
            <li><a href="https://alecchendev.medium.com/analyzing-the-social-network-of-my-high-school-7763df719363?sk=62b4f16ac9c4786c71b801b226f7e289" target="_blank">Social Network Analysis</a></li>
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