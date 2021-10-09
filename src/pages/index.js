import * as React from "react"
import Layout from "../components/layout.js";
import * as styles from "../styles/utils.module.css";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = () => {
  return (
    <Layout pageTitle={"Alec Chen - Home"} >
        <div>
            <h1>Hey, I'm Alec.</h1>
            <p>
              I'm a software engineer studying computer science and statistics at UIUC.
              I love to write, exercise, and cook. I'm currently most interested in
              blockchain and nutrition and I put together some notes/essays consolidating
              things I've learned about them from time to time.
            </p>
            <br/>
            <br/>
            <div className={styles.flexh}>
              <div className={styles.homesub}>
                <h2>About this site</h2>
                <p>
                  I made this site to have a place to share notes and essays, and
                  where people can get some basic information about me.
                </p>
              </div>
              <div className={styles.homesub}>
                <h2>Contact me</h2>
                <p>
                  Email: <a href="mailto:alecchendev@gmail.com" target="_blank">alecchendev@gmail.com</a>
                  <br/>
                  Github: <a href="https://github.com/alecchendev" target="_blank">alecchendev</a>
                  <br/>
                  Twitter: <a href="https://twitter.com/alecchendev" target="_blank">alecchendev</a>
                </p>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default IndexPage
