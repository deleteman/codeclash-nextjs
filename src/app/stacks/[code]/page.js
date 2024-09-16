import styles from './comparison.module.css';
import { getAllStacks, getAllComparisonIds, getComparisonContent } from '@/lib/utils';
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
    const comparisonData = await getComparisonContent(params.code, "stacks");
    return {
        title: comparisonData.title,
        description: comparisonData.description,
    };

}

export default async function ComparisonPage({ params }) {
    const comparisonData = await getComparisonContent(params.code, "stacks");

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
