import styles from './comparison.module.css';
import { getAllStacks, getAllComparisonIds, getComparisonContent, WEBSITE_TITLE } from '@/lib/utils';
import { formatDate } from '@/lib/date';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'highlight.js/styles/github.css'; // Or any other highlight.js theme


export async function generateStaticParams() {
    const paths = await getAllStacks();
    return paths.map((path) => ({
        code: path.params.code,
    }));
}
const MDXContent = dynamic(() => import('./MDXContent'), { ssr: false });

export async function generateMetadata({params}) {
    const comparisonData = await getComparisonContent(params.code, "paradigms");
    return {
        title: "CodeClash: " + comparisonData.title,
        description: comparisonData.description,
        openGraph: {
            title: "CodeClash: " + comparisonData.title,
            description: comparisonData.description,
            url: 'https://code-clash.net/stacks/' + params.code,
            siteName: WEBSITE_TITLE,
            type: 'website',
            images: [
              {
                url: '/og-image.png',
                secureUrl: 'https://www.code-clash.net/og-image.png',
                width: 1500,
                height: 500,
                alt: 'CodeClash: Compare Programming Languages & Frameworks',
              }
            ]
        }
    };

}

export default async function ComparisonPage({ params }) {
    const comparisonData = await getComparisonContent(params.code, "paradigms");

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/" className={styles.backLink}>
                    ← Back to Home
                </Link>
                <h1 className={styles.title}>{comparisonData.title}</h1>
                <p className={styles.date}>{formatDate(comparisonData.date)}</p>
            </header>
            <main className={styles.main}>
               <div className={styles.content}>
                    {typeof comparisonData.contentHtml === 'string' ? (
                        <div dangerouslySetInnerHTML={{ __html: comparisonData.contentHtml }} />
                    ) : (
                        <MDXContent source={comparisonData.contentHtml}  comparisons={getAllComparisonIds()}/>
                    )}
                </div>
            </main>
        </div>
    );
}
