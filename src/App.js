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

  const updateListHandler = ({ selectedList }) => {
    setSelectedBookList(selectedList);
  };

  const updateQuantityHandler = (newQuantity) => {
    setQuantityBooks(newQuantity);
  };

  return (
    <React.Fragment>
      <BookModal />
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
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
