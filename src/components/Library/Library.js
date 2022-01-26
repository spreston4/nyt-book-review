import { useState, useEffect } from "react";
import styles from "./Library.module.css";
import BookItem from "../BookItem/BookItem";
import loadingImage from "../../assets/images/Spinner-1s-200px.gif";

// Fetches book results for the selected list. Displays a BookItem for each result to the user. Results filtered to 10.
const Library = (props) => {
  const [libraryArray, setLibraryArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch book results for selected list
  useEffect(() => {
    const fetchBooks = async (searchList) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/${searchList}.json?api-key=${process.env.REACT_APP_API_KEY}`
        );

        const responseData = await response.json();
        const libraryData = responseData.results.books;

        // Populate array with relevant data
        const loadedBooks = [];
        for (const key in libraryData) {
          loadedBooks.push({
            id: key,
            amazonUrl: libraryData[key].amazon_product_url,
            author: libraryData[key].author,
            bookImage: libraryData[key].book_image,
            description: libraryData[key].description,
            isbn13: libraryData[key].primary_isbn13,
            publisher: libraryData[key].publisher,
            rank: libraryData[key].rank,
            rankLastWeek: libraryData[key].rank_last_week,
            title: libraryData[key].title,
            weeksOnList: libraryData[key].weeks_on_list,
          });
        }

        setLibraryArray(loadedBooks);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };
    fetchBooks(props.selectedList);
  }, [props.selectedList]);

  // Lift book info.
  const openModalHandler = (bookData) => {
    props.onOpenModal(bookData);
  };

  // Ensure correct quanity of books is displayed.
  const numResults = props.filterQuantity || libraryArray.length;

  return (
    <div className={styles.library}>
      {isLoading && <img src={loadingImage} />}
      {!isLoading &&
        libraryArray
          .slice(0, numResults)
          .map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onOpenModal={openModalHandler}
            />
          ))}
    </div>
  );
};

export default Library;
