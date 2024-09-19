import { Inter } from "next/font/google";
import "./globals.css";
import styles from './page.module.css';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { WEBSITE_TITLE } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const TITLE = WEBSITE_TITLE;
const DESCR = "Find the Best Technology for Your Next Project, start comparing programming languages & frameworks side by side and make informed decisions with CodeClash.";

export const metadata = {
  title: TITLE,
  description: DESCR,
  alternates: {
    canonical:  "./"
  },
  metadataBase:  "https://code-clash.net/",
  openGraph: {
    title: TITLE,
    description: DESCR,
    url: 'https://code-clash.net/',
    siteName: TITLE,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        secureUrl: 'https://www.code-clash.net/og-image.png',
        width: 1500,
        height: 500,
        alt: 'CodeClash: Compare Programming Languages & Frameworks',
      }
    ]
  },
};

// Function to get stack names from the stacks folder
const getStackNames = () => {
  const stacksDirectory = path.join(process.cwd(), 'src/app/stacks');
  const fileNames = fs.readdirSync(stacksDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
};

export default function RootLayout({ children }) {
  const stacks = getStackNames();

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <h1><a href="/">
              <img src="/logo.png" alt="CodeClash"/>
              </a></h1>
          </div>
          <nav>
            <ul className={styles.navList}>
              <li><a href="/">Home</a></li>
              <li><a href="/#comparison">Start Comparing</a></li>
              <li>
                <div className={styles.subMenu}>
                  <a href="#">Stacks</a>
                  <ul className={styles.dropdownMenu}>
                    {stacks.map((stack) => (
                      <li key={stack}>
                        <Link href={`/stacks/${stack}`}>{stack}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </header>
          {children}
          <footer className={styles.footer}>
            <p>&copy; 2024 CodeClash. All rights reserved.</p>
            <p>
              Follow us on <a href="https://twitter.com/intent/follow?screen_name=CodeClashDev" target="_blank" rel="noopener noreferrer" className={styles.social}>Twitter</a>
            </p>
          </footer>
        <script defer event-uuid="aa9b5b55-323b-4d52-9f67-18a9ee1877e8" src="https://tracker.metricswave.com/js/visits.js"></script>
  
        </body>
    </html>
  );
}
