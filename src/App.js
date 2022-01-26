import { useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import ListSelector from "./components/ListSelector/ListSelector";
import Library from "./components/Library/Library";

function App() {
  const [selectedBookList, setSelectedBookList] = useState({
    name: "Paperback Trade Fiction",
    encoded: "trade-fiction-paperback",
  });
  const [quantityBooks, setQuantityBooks] = useState(10);

  const updateListHandler = ({ selectedList }) => {
    setSelectedBookList(selectedList);
  };

  const updateQuantityHandler = (newQuantity) => {
    setQuantityBooks(newQuantity);
  };

  return (
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
  );
}

export default App;
