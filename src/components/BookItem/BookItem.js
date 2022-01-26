import styles from "./BookItem.module.css";

const BookItem = (props) => {
  // Limit title to 30 characters.
  const titleHandler = (title) => {
    if (title.length > 30) {
      return title.slice(0, 29) + "...";
    } else {
      return title;
    }
  };

  // Limit description on BookItem to 50 characters.
  const descriptionHandler = (description) => {
    if (description.length > 50) {
      return description.slice(0, 49) + "...";
    } else {
      return description;
    }
  };

  return (
    <div className={styles.book}>
      <div className={styles.content}>
        <h3>{titleHandler(props.book.title)}</h3>
        <p>{descriptionHandler(props.book.description)}</p>
        <button>Book Details</button>
      </div>
      <div className={styles.foreground}></div>
      <div className={styles.background}>
        <img src={props.book.bookImage} alt={`Cover for ${props.book.title}`} />
      </div>
    </div>
  );
};

export default BookItem;
