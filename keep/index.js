import * as React from "react"
import Layout from "../components/layout.js";
import * as styles from "../styles/utils.module.css";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = () => {
  return (
    <Layout pageTitle={"Alec Chen - Home"} >
        <div>
          <div className={styles.intro}>
            <h1>Hey, I'm Alec.</h1>
            <p>
              I'm a software engineer studying computer science and statistics at UIUC.
              I love to code, write, exercise, and cook.
              This last summer I worked as an emerging tech intern at AbbVie, and this
              summer (2022) I'll be a forward deployed software engineer intern at Palantir.
              I love meeting new people, so don't hesitate to reach out about anything!
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
                  and document things. From time to time I'll make an attempt at
                  one of the three. The following are those attempts.
                </p>
                <ul>
                  <li><a href="">Finding Solace in Television</a></li>
                </ul>
              </div>
              <div className={styles.homesub}>
                <h2>Code</h2>
                <p>
                  I'm a programmer at heart. Most days I'm either
                  working on a side project, or looking for a side project to work on.
                  Most of the stuff I work on is public on my <a href="https://github.com/alecchendev">Github</a>.
                  The following are a some highlights.
                </p>
                <ul>
                  <li><a href="https://github.com/alecchendev/spotify-social" target="_blank">Spotify Social</a></li>
                  <li><a href="https://github.com/alecchendev/spotify-refresh-token" target="_blank">getyourspotifyrefreshtoken.com</a></li>
                  <li><a href="https://github.com/alecchendev/spotify-social" target="_blank">3D Engine From Scratch</a></li>
                  <li><a href="https://github.com/alecchendev/runner-game" target="_blank">Runner Game</a></li>
                  <li><a href="https://github.com/alecchendev/social-network-analysis" target="_blank">Social Network Analysis</a></li>
                </ul>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default IndexPage