import { useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import ListSelector from "./components/ListSelector/ListSelector";

function App() {
  const [selectedBookList, setSelectedBookList] = useState({
    name: "Paperback Trade Fiction",
    encoded: "trade-fiction-paperback",
  });

  const updateListHandler = ({ selectedList }) => {
    setSelectedBookList(selectedList);
    console.log(selectedBookList);
  };
  return (
    <div className={styles.app}>
      <Header listName={selectedBookList.name} />
      <ListSelector onUpdateList={updateListHandler} />
    </div>
  );
}

export default App;
