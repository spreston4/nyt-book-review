import styles from "./BookItem.module.css";

const BookItem = (props) => {
  return (
    <div className={styles.book}>
        <div className={styles.content}>
        <h3>{props.book.title}</h3>
        <p>{props.book.description}</p>
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
