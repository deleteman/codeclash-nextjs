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

    let title = comp.title || comp.params.id.replace('-', ' vs ')
    let url = title.replace(' vs ', '-')
    return (
        <Link href={`/articles/${url}`} key={comp.params.id}>
        <div className={styles.comparisonBox}>
            <h3>{comp.title}</h3>
            <p>Compare {title}</p>
        </div>
        </Link>
    )
 
}