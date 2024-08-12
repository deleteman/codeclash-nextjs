import { Inter } from "next/font/google";
import "./globals.css";
import styles from './page.module.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CodeClash",
  description: "Find the Best Technology for Your Next Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <h1><a href="/">CodeClash</a></h1>
          </div>
          <nav>
            <ul className={styles.navList}>
              <li><a href="/">Home</a></li>
              <li><a href="/#comparison">Start Comparing</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </header>
          {children}
        <footer className={styles.footer}>
          <p>&copy; 2024 CodeClash. All rights reserved.</p>
        </footer>
        <script defer event-uuid="aa9b5b55-323b-4d52-9f67-18a9ee1877e8" src="https://tracker.metricswave.com/js/visits.js"></script>
  
        </body>
    </html>
  );
}
