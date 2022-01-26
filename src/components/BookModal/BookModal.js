import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./BookModal.module.css";

const BackdropOverlay = () => {
  const backdropElement = document.getElementById("backdrop-root");
  return createPortal(<div className={styles.backdrop}></div>, backdropElement);
};

const BookModal = (props) => {
  const modalElement = document.getElementById("modal-root");

  const [reviews, setReviews] = useState();

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

  const descriptionHandler = (description) => {
      if (description.length === 0) {
          return "Description not provided for this book.";
      } else {
          return description;
      }
  };

  console.log(props.book);
  console.log(props.book.amazonUrl);

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
              <p className={styles.byline}>Written by {props.book.author}. Published by {props.book.publisher}.</p>
              <div>
                  <h3>Best seller for {props.book.weeksOnList} weeks!</h3>
                  <p>{props.book.title} is currently ranked number {props.book.rank} on the New York Times Best Sellers list in its category.</p>
                  <a href={props.book.amazonUrl}target='_blank'>Find it on Amazon</a>
              </div>
          </div>
        </div>

        <button onClick={props.onCloseModal}>Close</button>
      </div>
    </React.Fragment>,
    modalElement
  );
};

export default BookModal;
