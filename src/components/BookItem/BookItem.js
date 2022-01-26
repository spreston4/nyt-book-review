import { useState } from "react";
import styles from "./BookItem.module.css";

const BookItem = (props) => {
  const [inHover, setInHover] = useState(false);

  // Limit title to 30 characters.
  const titleHandler = (title) => {
    if (title.length > 30) {
      return title.slice(0, 30) + "...";
    } else {
      return title;
    }
  };

  // Limit description on BookItem to 50 characters.
  const descriptionHandler = (description) => {
    if (description.length > 50) {
      return description.slice(0, 50) + "...";
    } else {
      return description;
    }
  };

  // Conditional formatting for animation
  const backgroundClasses = `${styles.background} ${
    inHover ? styles.show : styles.hide
  }`;

  const addHoverHandler = () => {
    setInHover(true);
  };

  const removeHoverHandler = () => {
    setInHover(false);
  };

  return (
    <div
      className={styles.book}
      onMouseEnter={addHoverHandler}
      onMouseLeave={removeHoverHandler}
    >
      <div className={styles.content}>
        <h3>{titleHandler(props.book.title)}</h3>
        <p>{descriptionHandler(props.book.description)}</p>
        <button>Book Details</button>
      </div>
      <div className={styles.foreground}></div>
      <div className={backgroundClasses}>
        <img src={props.book.bookImage} alt={`Cover for ${props.book.title}`} />
      </div>
    </div>
  );
};

export default BookItem;
