import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./BookModal.module.css";

const BackdropOverlay = () => {
  const backdropElement = document.getElementById("backdrop-root");
  return createPortal(<div className={styles.backdrop}></div>, backdropElement);
};

const BookModal = (props) => {
  const modalElement = document.getElementById("modal-root");

  useEffect(() => {
    const fetchReviews = async (isbn) => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${isbn}&api-key=${process.env.REACT_APP_API_KEY}`
        );

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };
    fetchReviews(props.book.isbn13);
  }, [props.book]);

  return createPortal(
    <React.Fragment>
      <BackdropOverlay />
      <div className={styles.modal}>
        <p>woop</p>
        <button onClick={props.onCloseModal}>Close</button>
      </div>
    </React.Fragment>,
    modalElement
  );
};

export default BookModal;
