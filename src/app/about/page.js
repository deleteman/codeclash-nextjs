import React from 'react';
import Head from 'next/head';
import styles from './About.module.css'; // You can create and customize this CSS module
import Layout from '../layout'

export default function About() {
  return (
    <div className={styles.container}>
      
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Welcome to Code Clash</h2>
          <p>
            At Code Clash, we believe that the right programming language can make or break a project. With so many languages available today, each with its own strengths, weaknesses, and use cases, choosing the right one for your needs can be overwhelming. That's where we come in.
          </p>
          <p>
            <strong>Code Clash</strong> is your go-to platform for comparing programming languages. Whether you're a seasoned developer, a tech enthusiast, or someone just starting their coding journey, our goal is to help you make informed decisions about the tools you use.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>What We Offer</h2>
          <ul>
            <li><strong>In-Depth Comparisons:</strong> Our platform provides detailed, side-by-side comparisons of popular programming languages. We don't just look at syntax; we dive deep into performance, use cases, community support, and more.</li>
            <li><strong>Expert-Driven Content:</strong> Our comparisons and guides are crafted by experienced developers and tech professionals who understand the nuances of each language.</li>
            <li><strong>Educational Resources:</strong> Beyond comparisons, we provide educational content to help you deepen your understanding of different programming languages.</li>
            <li><strong>Community Engagement:</strong> We believe in the power of community. Share your experiences, ask questions, and learn from others in our vibrant community of developers.</li>
          </ul>
        </section>
        
        <section className={styles.section}>
          <h2>Our Mission</h2>
          <p>
            <strong>Our mission is simple:</strong> to empower developers with the knowledge they need to choose the right tools for the job. In a rapidly evolving tech landscape, staying informed is key to success. Code Clash aims to be the definitive resource for anyone looking to compare programming languages and make educated decisions in their development work.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>Why Choose Code Clash?</h2>
          <ul>
            <li><strong>Comprehensive Analysis:</strong> We provide thorough and unbiased comparisons, considering all aspects of each language.</li>
            <li><strong>Expert Insight:</strong> Our content is created by developers, for developers, ensuring that the information is relevant and actionable.</li>
            <li><strong>Up-to-Date Information:</strong> We continuously update our content to reflect the latest trends and developments in the programming world.</li>
            <li><strong>User-Centric Design:</strong> Our tools are intuitive and customizable, making it easy to find the information you need.</li>
          </ul>
        </section>
        
        <section className={styles.section}>
          <h2>Join the Clash!</h2>
          <p>
            Whether you're deciding on a language for your next project or simply curious about how different languages stack up, Code Clash is here to help. Explore our comparisons, engage with the community, and take your development skills to the next level.
          </p>
          <p>
            Thank you for choosing Code Clash. Let's find the right language for your next big idea!
          </p>
        </section>
      </main>
      
    </div>
  );
}
