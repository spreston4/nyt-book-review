import { useState, useEffect } from "react";
import styles from "./ListSelector.module.css";

const ListSelector = (props) => {
  useEffect(() => {
    const fetchLists = async () => {
      const response = await fetch(
        `https://api.nytimes.com/svc/books/v3/lists/names.json?&api-key=${process.env.REACT_APP_API_KEY}`
      );

      if (!response.ok) {
        console.log("error fetching");
        return;
      }

      const data = await response.json();

      console.log(data);
    };

    fetchLists();
  }, []);

  return (
    <div className={styles.selector}>
      <p>test</p>
    </div>
  );
};

export default ListSelector;
