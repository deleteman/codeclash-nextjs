import React from 'react';
import styles from './RelatedComparisons.module.css'; // Add CSS for styling
import ComparisonBox from './ComparisonBox';

let comparisons = null;
const RelatedComparisons = ({ currentTechnology }) => {
    currentTechnology = currentTechnology.split("-")
  const filteredComparisons = comparisons.filter(
    (comp) =>
      comp.params.id.split("-").some((lang) => currentTechnology.includes(lang)) &&
      !currentTechnology.every((lang) => comp.params.id.split("-").includes(lang))
  );

  if (filteredComparisons.length === 0) {
    return <p>No related comparisons available.</p>;
  }

  return (
    <div className={styles.relatedComparisonsContainer}>
      <h2>Keep comparing...</h2>
      <div className={styles.comparisonsGrid}>
        {filteredComparisons.map((comp) => (
          <ComparisonBox key={comp.params.id} comp={comp} />
        ))}
      </div>
    </div>
  );
};

export default function(ids) {
    comparisons = ids;
    return RelatedComparisons;
}
