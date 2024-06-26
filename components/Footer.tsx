import { useAddress } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';

export default function Footer() {

  return (
    <footer className={styles.footer}>
        <div className={styles.footerCopyright}>
        <p>&copy; {new Date().getFullYear()} | CALESTIQ</p>
      </div>
      <div className={styles.footerContent}>
          <ul className={styles.socialLinks}>
            <li>
              <a href="https://twitter.com/calestiq" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://discord.com/invite/egrbYqWjSJ" target="_blank" rel="noopener noreferrer">
                Discord
              </a>
            </li>
          </ul>
      </div>
    </footer>
  );
}

