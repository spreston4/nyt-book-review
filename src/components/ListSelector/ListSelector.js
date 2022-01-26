import React, { useState, useEffect } from "react";
import styles from "./ListSelector.module.css";
import loadingImage from '../../assets/images/Spinner-1s-45px.gif';

const ListSelector = (props) => {
  const [listNames, setListNames] = useState([]);
  const [selectedList, setSelectedList] = useState({name: '', encoded: ''});
  const [selectionError, setSelectionError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

        setListNames(loadedLists.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1: 0));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching lists', error);
      }
    };
    fetchLists();
  }, []);

  // Passes selectedList state to App when user presses submit.
  const submitFormHandler = (event) => {
    event.preventDefault();

    // Ensure valid input exists
    if (selectedList.name === "blank" || selectedList.name.length === 0) {
      setSelectionError(true);
      return;
    }

    props.onUpdateList({ selectedList });
  };

  // Sets state whenever new option is selected from the dropdown.
  const formChangeHandler = (event) => {
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
        <label htmlFor="list-selector">
          <h3>Checkout a new Book List!</h3>
        </label>
        <select
          onChange={formChangeHandler}
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
        <button type="submit">Submit</button>
        {isLoading && <img src={loadingImage} />}
        {selectionError && <p className={styles.error}>Select a valid Book List.</p>}
      </form>
    </React.Fragment>
  );
};

export default ListSelector;
