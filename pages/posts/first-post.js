import Link from 'next/link';

export default function FirstPost() {
    return (
        <>
        <h1>First page!</h1>
        <h2>
            <Link href='/'>
                <a>Link back to home</a>
            </Link>
        </h2>
        </>

    );
}