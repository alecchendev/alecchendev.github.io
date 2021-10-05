import * as React from "react"
import Layout from "../components/layout.js";
import * as styles from "../styles/utils.module.css";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = () => {
  return (
    <Layout pageTitle={"Alec Chen - Home"} >
        <div>
            <h1>Hey, I'm Alec.</h1>
            <p>I'm a student studying computer science at UIUC with a
                growing interest in distributed systems and cryptography.
                Outside of tech, I'm interested in all kinds of things,
                including cooking, nutrition, exercise, and film, to name a few.</p>
        </div>
    </Layout>
  )
}

export default IndexPage
