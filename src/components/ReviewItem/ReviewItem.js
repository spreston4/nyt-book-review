import styles from "./ReviewItem.module.css";

// Displays relevant review data to the user on BookModal. Accepts review data from BookModal.
const ReviewItem = (props) => {
  // Convert uppercase reveiew author to title case
  const convertCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");
  };

  return (
    <div className={styles.review}>
      <p>{props.review.summary}</p>
      <p className={styles.byline}>
        Review by {convertCase(props.review.byline)}. Published on{" "}
        {props.review.publication_dt}.
      </p>
      <a href={props.review.url} target="_blank">
        Full Review
      </a>
    </div>
  );
};

export default ReviewItem;
