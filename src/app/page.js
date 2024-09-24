import { getAllComparisonIds } from '../lib/utils';
import DropdownComparison from '@/components/DropdownComparison';
import styles from './page.module.css';
import ComparisonBox from '@/components/ComparisonBox';
import LinkBox from '@/components/LinkBox';

export default async function Home() {
  const allComparisons = getAllComparisonIds();

  // Extract unique languages from the comparisons
  const languages = Array.from(new Set(allComparisons.flatMap(({ params }) => params.id.split('-'))));

  return (
    <div>
      <section className={styles.hero}>
        <h2>Find the <span className={styles.highlight}>Best Technology</span> for Your Next Project</h2>
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
        <h3>Most common language comparisons</h3>
        <div className={styles.pageComparisonsGrid}>
          <ComparisonBox comp={{ title: 'PHP vs Python', params: { id: 'php-python' } }} />
          <ComparisonBox comp={{ title: 'JAVA vs JavaScript', params: { id: 'java-javascript' } }} />
          <ComparisonBox comp={{ title: 'Haskell vs Scala', params: { id: 'haskell-scala' } }} />
          </div>
      </section>

      <section id="most-common" className={styles.infoSection}>
        <h3>Most common frameworks</h3>
        <div className={styles.pageComparisonsGrid}>
          <ComparisonBox comp={{ title: 'React vs Angular', params: { id: 'react-angular' } }} />
          <ComparisonBox comp={{ title: 'React vs Vue', params: { id: 'react-vue' } }} />
          </div>
      </section>
      <section id="most-common" className={styles.infoSection}>
        <h3>Most common tech stacks</h3>
        <div className={styles.pageComparisonsGrid}>
          <LinkBox title={'MERN'} />
          <LinkBox title={'DJANGO'} />
          <LinkBox title={'MEVN'} />
          </div>
      </section>
     <section id="most-common" className={styles.infoSection}>
        <h3>Most common programming paradigms</h3>
        <div className={styles.pageComparisonsGrid}>
          <LinkBox title={'Functional'} type='paradigms'/>
          <LinkBox title={'OOP'} type='paradigms'/>
        </div>
      </section>





   </div>
  );
}
