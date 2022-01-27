import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./BookModal.module.css";
import ReviewItem from "../ReviewItem/ReviewItem";
import Button from "../ui/Button/Button";

// Stop user from interacting with main page while modal is active
const BackdropOverlay = () => {
  const backdropElement = document.getElementById("backdrop-root");
  return createPortal(<div className={styles.backdrop}></div>, backdropElement);
};

// Displays a modal containing relevant data for selected book. If reviews are available, displays a ReviewItem for each availble review. Accepts book data from App.
const BookModal = (props) => {
  const modalElement = document.getElementById("modal-root");
  const [reviews, setReviews] = useState();

  // Fetch review for selected book. Re-evaluates when new book is selected.
  useEffect(() => {
    const fetchReviews = async (isbn) => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${isbn}&api-key=${process.env.REACT_APP_API_KEY}`
        );

        const responseData = await response.json();

        // Ensure results are present
        if (responseData.results.length === 0) {
          return;
        }

        setReviews(responseData.results);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };
    fetchReviews(props.book.isbn13);
  }, [props.book]);

  // Render message to user if book does not have a description.
  const descriptionHandler = (description) => {
    if (description.length === 0) {
      return "Description not provided for this book.";
    } else {
      return description;
    }
  };

  // Convert uppercase title to title case for use in paragraph body
  const convertCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");
  };

  return createPortal(
    <React.Fragment>
      <BackdropOverlay />
      <div className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={props.book.bookImage} />
          </div>
          <div className={styles.details}>
            <h2>{props.book.title}</h2>
            <p>{descriptionHandler(props.book.description)}</p>
            <p className={styles.byline}>
              Written by {props.book.author}. Published by{" "}
              {props.book.publisher}.
            </p>
            <div>
              <h3>Best seller for {props.book.weeksOnList} weeks!</h3>
              <p>
                {convertCase(props.book.title)} is currently ranked number{" "}
                {props.book.rank} on the New York Times Best Sellers list in its
                category.
              </p>
              <a href={props.book.amazonUrl} target="_blank">
                Find it on Amazon
              </a>
            </div>
          </div>
        </div>
        <div className={styles.reviews}>
          <h2>Reviews</h2>
          {!reviews && <p>There are no reviews available for this book.</p>}
          {reviews &&
            reviews.map((review) => (
              <ReviewItem key={Math.random()} review={review} />
            ))}
        </div>
        <Button onClick={props.onCloseModal} alt={false}>
          Close
        </Button>
      </div>
    </React.Fragment>,
    modalElement
  );
};

export default BookModal;
