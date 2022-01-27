import { useState } from "react";
import styles from "./BookItem.module.css";
import Button from "../ui/Button/Button";

// Displays a card to the user with teaser information for each book. Accepts book information from Library. Lifts book information to App.
const BookItem = (props) => {
  const [inHover, setInHover] = useState(false);

  const addHoverHandler = () => {
    setInHover(true);
  };

  const removeHoverHandler = () => {
    setInHover(false);
  };

  // Pass book data back to app when user selects the details button
  const openModalHandler = () => {
    props.onOpenModal(props.book);
  };

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
    if (description.length === 0) {
      return "Description not provided for this book.";
    } else if (description.length > 50) {
      return description.slice(0, 50) + "...";
    } else {
      return description;
    }
  };

  // Conditional formatting for animation
  const backgroundClasses = `${styles.background} ${
    inHover ? styles.show : styles.hide
  }`;

  return (
    <div
      className={styles.book}
      onMouseEnter={addHoverHandler}
      onMouseLeave={removeHoverHandler}
    >
      <div className={styles.content}>
        <h3>{titleHandler(props.book.title)}</h3>
        <p>{descriptionHandler(props.book.description)}</p>
        <Button onClick={openModalHandler} alt={false}>
          Book Details
        </Button>
      </div>
      <div className={styles.foreground}></div>
      <div className={backgroundClasses}>
        <img src={props.book.bookImage} alt={`Cover for ${props.book.title}`} />
      </div>
    </div>
  );
};

export default BookItem;
