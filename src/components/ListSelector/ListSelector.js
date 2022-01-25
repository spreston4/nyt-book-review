import { useState, useEffect } from "react";
import styles from "./ListSelector.module.css";

const ListSelector = (props) => {
    const [listNames, setListNames] = useState([]);

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

  console.log(listNames);

  return (
    <div className={styles.selector}>
      <form>
          <label htmlFor="list-selector">List Selector</label>
          <input list='lists' name='list-selector' id='list-selector' />
             <datalist id='lists'>
                 {listNames.map((list) => (
                     <option key={list.id} value={list.name} data-encoded={list.encoded} />
                 ))}
             </datalist>
      </form>
    </div>
  );
};

export default ListSelector;
