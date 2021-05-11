import Head from 'next/head'
import Image from 'next/image'
import { getSortedPostsData } from '../lib/posts';
import styles from '../styles/layout.module.css'
import Link from 'next/link'
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const name = 'Alec Chen';
export const siteTitle = 'Alec Chen';

export default function Layout({ children, home, skinny, selected }) {
  return (
    <div className={styles.container}>

      <div className={styles.navigation}>
        <Link href='/'>Alec Chen</Link>
        <Link href='/projects'>Projects</Link>
        <Link href='/videos'>Videos</Link>
        <Link href='/consumption'>Consumption</Link>
        <Link href='/timeline'>Timeline</Link>
        <Link href='/people'>People</Link>
        <Link href='/blog'>Blog</Link>
      </div>

      <main className={styles.content}>{children}</main>
      
    </div>
  )
}