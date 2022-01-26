import React from "react";
import { createPortal } from "react-dom";
import styles from "./BookModal.module.css";

const BackdropOverlay = () => {
  const backdropElement = document.getElementById("backdrop-root");
  return createPortal(<div className={styles.backdrop}></div>, backdropElement);
};

const BookModal = (props) => {
  const modalElement = document.getElementById("modal-root");
  

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
