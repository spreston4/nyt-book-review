import React, { useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import ListSelector from "./components/ListSelector/ListSelector";
import Library from "./components/Library/Library";
import BookModal from "./components/BookModal/BookModal";

const initialLibraryState = {
  list: {
    name: "Paperback Trade Fiction",
    encoded: "trade-fiction-paperback",
  },
  quantity: 10,
};

// Displays content to the user. Accepts state updates from ListSelector and passes updated state values to Header & Library.
function App() {
  const [selectedBookList, setSelectedBookList] = useState(
    initialLibraryState.list
  );
  const [quantityBooks, setQuantityBooks] = useState(
    initialLibraryState.quantity
  );
  const [selectedBook, setSelectedBook] = useState({});
  const [showModal, setShowModal] = useState(false);

  const updateListHandler = ({ selectedList }) => {
    setSelectedBookList(selectedList);
  };

  const updateQuantityHandler = (newQuantity) => {
    setQuantityBooks(newQuantity);
  };

  const openModalHandler = (bookData) => {
    setSelectedBook(bookData);
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      {showModal && (
        <BookModal onCloseModal={closeModalHandler} book={selectedBook} />
      )}
      <div className={styles.app}>
        <Header listName={selectedBookList.name} />
        <div className={styles.container}>
          <ListSelector
            onUpdateList={updateListHandler}
            onUpdateQuantity={updateQuantityHandler}
          />
          <Library
            selectedList={selectedBookList.encoded}
            filterQuantity={quantityBooks}
            onOpenModal={openModalHandler}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
