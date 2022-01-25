import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>NYT Book Reviews: <span className={styles.subtitle}>Booklist Placeholder</span></h1>
    </div>
  );
};

export default Header;
