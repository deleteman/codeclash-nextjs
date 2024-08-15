import React from 'react';
import Link from 'next/link';
import styles from './RelatedComparisons.module.css'; // Add CSS for styling

let comparisons = null;
const RelatedComparisons = ({ currentLanguages }) => {
    currentLanguages = currentLanguages.split("-")
  const filteredComparisons = comparisons.filter(
    (comp) =>
      comp.params.id.split("-").some((lang) => currentLanguages.includes(lang)) &&
      !currentLanguages.every((lang) => comp.params.id.split("-").includes(lang))
  );

  if (filteredComparisons.length === 0) {
    return <p>No related comparisons available.</p>;
  }

  return (
    <div className={styles.relatedComparisonsContainer}>
      <h2>Keep comparing...</h2>
      <div className={styles.comparisonsGrid}>
        {filteredComparisons.map((comp) => (
          <Link href={`/articles/${comp.params.id}`} key={comp.params.id}>
            <div className={styles.comparisonBox}>
              <h3>{comp.title}</h3>
              <p>Compare {comp.params.id.replace("-", ' vs ')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function(ids) {
    comparisons = ids;
    return RelatedComparisons;
}
