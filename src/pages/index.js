import * as React from "react"
import Layout from "../components/layout.js";
import * as styles from "../styles/utils.module.css";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = () => {
  return (
    <Layout pageTitle={"Alec Chen - Home"} bgcolor={styles.bggreen}>
        <div className={styles.flexh}>
            <div className={styles.myface}>
                <StaticImage className={styles.indeximg} src="../images/profile.png" alt="butter dog" fadeIn={false}/>
            </div>
            <div className={[styles.description, styles.card].join(' ')}>
                <h1>Hey! I'm Alec.</h1>
                <p>
                    I'm a software engineer studying computer science at UIUC with a growing interest
                    in distributed systems and cryptography.
                </p>

            </div>

        </div>
        <div className={[styles.aboutsite, styles.card].join(' ')}>
            <h2>
                About this site
            </h2>
            <p>
                I've made this site as a place for me to put any writing/notes I put together
                as well as somewhere for people to learn a bit about me if they're curious.
            </p>
            <p>
                About - a little bit about my background, how I spend my time, and the
                things I consume.
            </p>
            <p>
                Writing - I haven't written much quite yet, but I plan to mostly compile concise, understandable
                notes on blockchain and nutrition that can help people see the narratives behind some
                of the most difficult-to-navigate fields.
            </p>
        </div>
        <div className={[styles.card].join(' ')}>
            <h2>
                Contact me
            </h2>
            <p>
                <a href="https://github.com/alecchendev">GitHub</a>
            </p>
        </div>
    </Layout>
  )
}

export default IndexPage
