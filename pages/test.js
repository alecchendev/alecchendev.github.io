import Layout from '../components/layout'
import Link from 'next/link'

export default function test() {
    return (
        <Layout>
            If you're seeing this, then it worked!
            <Link href='/'><a>Back to home</a></Link>
        </Layout>
    )
}