import { useState, useEffect } from "react";
import styles from "./Header.module.css";

// Displays title and selected list to the user. Subtitle updates whenever user selects a new list from ListSelector.
const Header = (props) => {
  // Conditional formatting for subtitle animation.
  const [animateSubtitle, setAnimateSubtitle] = useState(false);
  const subtitleClasses = `${styles.subtitle} ${
    animateSubtitle ? styles.bump : ""
  }`;

  // Ensure animation is repeatable.
  useEffect(() => {
    setAnimateSubtitle(true);

    const timer = setTimeout(() => {
      setAnimateSubtitle(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [props.listName]);

  return (
    <div className={styles.header}>
      <h1>NYT Book Reviews:</h1>
      <p className={subtitleClasses}>{props.listName}</p>
    </div>
  );
};

export default Header;
