import styles from './comparison.module.css';
import { getAllComparisonIds, getComparisonContent } from '@/lib/utils';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'highlight.js/styles/github.css'; // Or any other highlight.js theme


export async function generateStaticParams() {
    const paths = await getAllComparisonIds();
    return paths.map((path) => ({
        id: path.params.id,
    }));
}
const MDXContent = dynamic(() => import('./MDXContent'), { ssr: false });


export default async function ComparisonPage({ params }) {
    const comparisonData = await getComparisonContent(params.id);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/" className={styles.backLink}>
                    ← Back to Home
                </Link>
                <h1 className={styles.title}>{comparisonData.title}</h1>
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
