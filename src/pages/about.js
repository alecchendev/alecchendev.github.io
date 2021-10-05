import * as React from "react"
import Layout from "../components/layout.js";
import * as styles from "../styles/utils.module.css";
import { StaticImage } from "gatsby-plugin-image";

const AboutPage = () => {
  return (
    <Layout pageTitle={"Alec Chen - About"} bgcolor={styles.bgyellow}>
        <div className={[styles.section, styles.card].join(' ')}>
            <div className={styles.myface}>
                <StaticImage className={styles.indeximg} src="../images/profile.png" alt="butter dog" fadeIn={false}/>
            </div>
            <h1>
                About
            </h1>
            <p>
                I've made this site as a place for me to put any writing/notes I put together
                as well as somewhere for people to learn a bit about me if they're curious.
            </p>
        </div>
        <div className={[styles.section, styles.card].join(' ')}>
            <h2>
                Background
            </h2>
            <p>
                I've made this site as a place for me to put any writing/notes I put together
                as well as somewhere for people to learn a bit about me if they're curious.
            </p>
        </div>
        <div className={[styles.section, styles.card].join(' ')}>
            <h2>
                Stuff I do
            </h2>
            <p>
                I've made this site as a place for me to put any writing/notes I put together
                as well as somewhere for people to learn a bit about me if they're curious.
            </p>
        </div>
        <div className={[styles.section, styles.card].join(' ')}>
            <h2>
                Things I consume
            </h2>
            <p>
                I've made this site as a place for me to put any writing/notes I put together
                as well as somewhere for people to learn a bit about me if they're curious.
            </p>
        </div>
    </Layout>
  )
}

export default AboutPage
