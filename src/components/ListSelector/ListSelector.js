import React, { useState, useEffect, useRef } from "react";
import styles from "./ListSelector.module.css";
import Button from "../ui/Button/Button";
import loadingImage from "../../assets/images/Spinner-1s-45px.gif";

const ListSelector = (props) => {
  const [listNames, setListNames] = useState([]);
  const [selectedList, setSelectedList] = useState({ name: "", encoded: "" });
  const [selectionError, setSelectionError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const quantity = useRef();

  // Fetch list names from NYT api on application load
  useEffect(() => {
    setIsLoading(true);
    const fetchLists = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/names.json?&api-key=${process.env.REACT_APP_API_KEY}`
        );

        const responseData = await response.json();
        const listData = responseData.results;

        // Populate array with relevant data
        const loadedLists = [];
        for (const key in listData) {
          loadedLists.push({
            id: key,
            name: listData[key].display_name,
            encoded: listData[key].list_name_encoded,
          });
        }

        // Alphabetize results & set state
        setListNames(
          loadedLists.sort((a, b) =>
            a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0
          )
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching lists", error);
      }
    };
    fetchLists();
  }, []);

  // Pass selectedList state to App when user presses submit.
  const submitFormHandler = (event) => {
    event.preventDefault();

    // Ensure valid input exists
    if (selectedList.name === "blank" || selectedList.name.length === 0) {
      setSelectionError(true);
      return;
    }

    props.onUpdateList({ selectedList });
    props.onUpdateQuantity(quantity.current.value);
  };

  // Sets state whenever new list option is selected from the dropdown.
  const listChangeHandler = (event) => {
    // Reset error state if it exists.
    setSelectionError(false);

    setSelectedList({
      name: event.target.value,
      encoded:
        event.target[event.target.selectedIndex].getAttribute(
          "data-list-encoded"
        ),
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={submitFormHandler} className={styles.selector}>
        {!isLoading && (
          <React.Fragment>
            <div className={styles.selections}>
              <div className={styles.item}>
                <label htmlFor="list-selector">
                  <h3>Checkout a new Book List!</h3>
                </label>
                <select
                  onChange={listChangeHandler}
                  list="lists"
                  name="list-selector"
                  id="list-selector"
                >
                  <option value="blank">Select a NYT Book List</option>
                  {listNames.map((list) => (
                    <option
                      key={list.id}
                      value={list.name}
                      data-list-encoded={list.encoded}
                    >
                      {list.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div className={styles.item}>
                <label htmlFor="quantity-selector">
                  <h3>Select quantity!</h3>
                </label>
                <select
                  ref={quantity}
                  list="quantity"
                  name="quantity-selector"
                  id="quantity-selector"
                  defaultValue={10}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value="">All</option>
                </select>
              </div>
            </div>
            <div>
              <Button type="submit" alt={true}>
                Submit
              </Button>
              {selectionError && (
                <p className={styles.error}>Select a valid Book List.</p>
              )}
            </div>
          </React.Fragment>
        )}
        {isLoading && <img src={loadingImage} />}
      </form>
    </React.Fragment>
  );
};

export default ListSelector;
