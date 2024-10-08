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
export default function LinkBox({ title, type = "stacks" }) {

    let url = encodeURI(title.replace(' vs ', '-').replace("#", "[-]"))
    if(type == "paradigms") {
        url = url.toLowerCase();
    }
    return (
        <Link href={`/${type}/${url}`} >
        <div className={styles.comparisonBox}>
            <h3>{title}</h3>
        </div>
        </Link>
    )
 
}