'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './DropdownComparison.module.css';

export default function DropdownComparison({ languages, allComparisons }) {
  const [firstLanguage, setFirstLanguage] = useState('');
  const [secondLanguage, setSecondLanguage] = useState('');
  const router = useRouter();

  // Get available comparisons for the selected first language
  const availableSecondLanguages = firstLanguage
    ? allComparisons
        .filter(({ params }) => params.id.startsWith(firstLanguage + '-') || params.id.endsWith('-' + firstLanguage))
        .map(({ params }) => params.id.replace(firstLanguage + '-', '').replace('-' + firstLanguage, ''))
    : [];

  // Handle the compare button click
  const handleCompare = () => {
    if (firstLanguage && secondLanguage) {
      // Check both possible orders
      const comparisonId1 = `${firstLanguage}-${secondLanguage}`
      const comparisonId2 = `${secondLanguage}-${firstLanguage}`

      // Find the correct comparison ID that exists
      let validComparison = allComparisons.find(({ params }) => params.id === comparisonId1);

      if (!validComparison) {
        validComparison = allComparisons.find(({ params }) => params.id === comparisonId2);
        if (validComparison) {
          // Swap the values if the inverse exists
          setSecondLanguage(firstLanguage)
          setSecondLanguage(firstLanguage)
        } else {
          alert('Comparison not found.');
          return;
        }
      }

      router.push(`/articles/${validComparison.params.id}`);
    }
  };

  return (
    <div className={styles.comparisonContainer}>
      <select
        value={firstLanguage}
        onChange={(e) => {
          setFirstLanguage(e.target.value);
          setSecondLanguage(''); // Reset second language when first language changes
        }}
        className={styles.dropdown}
      >
        <option value="" disabled>Select first technology</option>
        {languages.map((language) => (
          <option key={language} value={language}>{language}</option>
        ))}
      </select>

      <select
        value={secondLanguage}
        onChange={(e) => setSecondLanguage(e.target.value)}
        className={styles.dropdown}
        disabled={!firstLanguage}
      >
        <option value="" disabled>Select second technology</option>
        {availableSecondLanguages.map((language) => (
          <option key={language} value={language}>{language}</option>
        ))}
      </select>

      <button
        onClick={handleCompare}
        className={styles.compareButton}
        disabled={!firstLanguage || !secondLanguage}
      >
        Compare
      </button>
    </div>
  );
}
