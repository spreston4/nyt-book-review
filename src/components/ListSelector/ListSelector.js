import React, { useState, useEffect } from "react";
import styles from "./ListSelector.module.css";

const ListSelector = (props) => {
  const [listNames, setListNames] = useState([]);
  const [selectedList, setSelectedList] = useState({});

  // Fetch list names from NYT api on application load
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/names.json?&api-key=${process.env.REACT_APP_API_KEY}`
        );

        if (!response.ok) {
          console.log("error fetching");
          return;
        }

        const responseData = await response.json();
        const listData = responseData.results;
        const loadedLists = [];

        for (const key in listData) {
          loadedLists.push({
            id: key,
            name: listData[key].display_name,
            encoded: listData[key].list_name_encoded,
          });
        }

        setListNames(loadedLists);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLists();
  }, []);

  const submitFormHandler = (event) => {
    event.preventDefault();
  };

  const formChangeHandler = (event) => {
    setSelectedList({
      name: event.target.value,
      encoded:
        event.target[event.target.selectedIndex].getAttribute(
          "data-list-encoded"
        ),
    });
  };

  console.log(selectedList);

  return (
    <React.Fragment>
      <form onSubmit={submitFormHandler} className={styles.selector}>
        <div className={styles.controls}>
          <label htmlFor="list-selector">Select Book List</label>
          <button type="submit">Submit</button>
        </div>
        <select
          onChange={formChangeHandler}
          list="lists"
          name="list-selector"
          id="list-selector"
        >
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
      </form>
    </React.Fragment>
  );
};

export default ListSelector;
