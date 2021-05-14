import '../styles/globals.css'
import { useState } from 'react'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {

  const [ colorMode, setColorMode ] = useState('Dark Mode');

  const toggleDarkMode = () => {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      setColorMode('Dark Mode');
    } else {
      document.body.classList.add("dark-mode");
      setColorMode('Light Mode');
    }
  }

  return (
  <Layout toggleDarkMode={toggleDarkMode} colorMode={colorMode} >
    <Component {...pageProps} />
  </Layout>
  )
}

export default MyApp
