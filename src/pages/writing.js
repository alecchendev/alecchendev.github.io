import * as React from "react"
import Layout from "../components/layout.js";
import * as styles from "../styles/utils.module.css";

const WritingPage = () => {
  return (
    <Layout pageTitle={"Alec Chen - Writing"} bgcolor={styles.bgblue}>
        <div className={[styles.section, styles.card].join(' ')}>
            <h1>
                Writing
            </h1>
            <p>
                I've made this site as a place for me to put any writing/notes I put together
                as well as somewhere for people to learn a bit about me if they're curious.
            </p>
        </div>
        <div className={[styles.section, styles.card].join(' ')}>
            <h2>
                Blockchain
            </h2>
            <p>
                I've made this site as a place for me to put any writing/notes I put together
                as well as somewhere for people to learn a bit about me if they're curious.
            </p>
        </div>
        <div className={[styles.section, styles.card].join(' ')}>
            <h2>
                Nutrition
            </h2>
            <p>
                I've made this site as a place for me to put any writing/notes I put together
                as well as somewhere for people to learn a bit about me if they're curious.
            </p>
        </div>
    </Layout>
  )
}

export default WritingPage
