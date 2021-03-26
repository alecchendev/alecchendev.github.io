import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout';

export default function FirstPost() {
    return (
        <Layout>
        <style jsx>
        {`
            h1 {
                background-color: yellow;
            }
        `}
        </style>
        <Head>
            <title>First Post</title>
        </Head>
        <h1>First page!</h1>
        <Image
            src='/images/profile.jpg'
            width={144}
            height={144}
            alt={'Alec\'s propic'}
        />
        <h2>
            <Link href='/'>
                <a>Link back to home</a>
            </Link>
        </h2>
        </Layout>

    );
}