import styles from "./SidebarFooter.module.css";
export default function SidebarFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} WorldWide Inc.
      </p>
    </footer>
  );
}
