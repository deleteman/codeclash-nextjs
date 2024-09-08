import { getAllComparisonIds } from '../lib/utils';
import DropdownComparison from '@/components/DropdownComparison';
import styles from './page.module.css';
import ComparisonBox from '@/components/ComparisonBox';

export default async function Home() {
  const allComparisons = getAllComparisonIds();

  // Extract unique languages from the comparisons
  const languages = Array.from(new Set(allComparisons.flatMap(({ params }) => params.id.split('-'))));

  return (
    <div>
      <section className={styles.hero}>
        <h2>Find the Best Technology for Your Next Project</h2>
        <p>Compare programming languages & frameworks side by side and make informed decisions with CodeClash.</p>
        <a href="#comparison" className={styles.ctaButton}>Start Comparing</a>
      </section>

      <section id="about" className={styles.infoSection}>
        <h3>About CodeClash</h3>
        <p>CodeClash is your go-to platform for comparing programming languages and frameworks. 
            Whether you're a developer, student, or tech enthusiast, our easy-to-use tool helps you choose the right technology for your next project.</p>
      </section>

      <section id="comparison" className={styles.infoSection}>
        <h3>Compare Technologies</h3>
        <p>Select two technologies to compare:</p>
        {/* Client Component */}
        <DropdownComparison languages={languages} allComparisons={allComparisons} />
      </section>

      <section id="most-common" className={styles.infoSection}>
        <h3>Most common questions</h3>
        <div className={styles.pageComparisonsGrid}>
          <ComparisonBox comp={{ title: 'React vs Angular', params: { id: 'react-angular' } }} />
          <ComparisonBox comp={{ title: 'JAVA vs JavaScript', params: { id: 'java-javascript' } }} />
          <ComparisonBox comp={{ title: 'React vs Vue', params: { id: 'react-vue' } }} />
          </div>
      </section>


   </div>
  );
}
