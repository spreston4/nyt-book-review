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

  const updateListHandler = ({ selectedList }) => {
    setSelectedBookList(selectedList);
  };

  return (
    <div className={styles.app}>
      <Header listName={selectedBookList.name} />
      <div className={styles.container}>
      <ListSelector onUpdateList={updateListHandler} />
      <Library selectedList={selectedBookList.encoded}/>
      </div>
    </div>
  );
}

export default App;
