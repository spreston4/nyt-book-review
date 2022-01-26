import { useState, useEffect } from "react";
import styles from "./Library.module.css";

// Fetches book results for the selected list. Displays a BookItem for each result to the user. Results filtered to 10.
const Library = (props) => {
  // Fetch book results for selected list
  useEffect(() => {
    const fetchBooks = async (searchList) => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/${searchList}.json?api-key=${process.env.REACT_APP_API_KEY}`
        );

        if (!response.ok) {
          console.log("error fetching");
          return;
        }

        const responseData = await response.json();
        const numResults = responseData.num_results;
        const libraryData = responseData.results;
        console.log(numResults);
        console.log(libraryData);

      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks(props.selectedList);
  }, [props.selectedList]);

  return (
    <div className={styles.library}>
      <p>Library placeholder</p>
    </div>
  );
};

export default Library;
