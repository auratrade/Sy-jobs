import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          وظائف 
        </Link>
        <nav className={styles.nav}>
          <Link href="/">الرئيسية</Link>
        </nav>
      </div>
    </header>
  );
}