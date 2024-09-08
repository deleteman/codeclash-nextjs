import styles from './ComparisonBox.module.css'
import Link from 'next/link';

/**
 * 
 * Sample format of the "comp" parameter:
 * {
 *  title: 'Python vs JavaScript',
 *  params: { id: 'python-javascript' }
 * }
 */
export default function ComparisonBox({ comp }) {

    return (
        <Link href={`/articles/${comp.params.id}`} key={comp.params.id}>
        <div className={styles.comparisonBox}>
            <h3>{comp.title}</h3>
            <p>Compare {comp.params.id.replace("-", ' vs ')}</p>
        </div>
        </Link>
    )
 
}