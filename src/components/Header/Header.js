import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = (props) => {

  const [animateSubtitle, setAnimateSubtitle] = useState(false);
  const subtitleClasses = `${styles.subtitle} ${animateSubtitle ? styles.bump : ''}`;


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
