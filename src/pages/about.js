import * as React from "react"
import Layout from "../components/layout.js";
import * as styles from "../styles/utils.module.css";

const AboutPage = () => {
  return (
    <Layout pageTitle={"Alec Chen - About"}>
        <div className={[styles.section, styles.card].join(' ')}>
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
