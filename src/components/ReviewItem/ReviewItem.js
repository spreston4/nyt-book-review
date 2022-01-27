import styles from"./ReviewItem.module.css";

const ReviewItem = (props) => {
  return (
    <div className={styles.review}>
      <p>{props.review.summary}</p>
      <p className={styles.byline}>
        Review by {props.review.byline}. Published on {props.review.publication_dt}.
      </p>
      <a href={props.review.url}>FULL REVIEW</a>
    </div>
  );
};

export default ReviewItem;