import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <h1>
        NYT Book Reviews:{" "}
        <span className={styles.subtitle}>
          {props.listName || "Booklist Placeholder"}
        </span>
      </h1>
    </div>
  );
};

export default Header;
