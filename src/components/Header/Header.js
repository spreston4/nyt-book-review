import styles from "./Header.module.css";
import ListSelector from "../ListSelector/ListSelector";

const Header = (props) => {

  const updateListHandler = ({ selectedList }) => {
    console.log('header');
    console.log(selectedList);
  };

  return (
    <div className={styles.header}>
      <h1>
        NYT Book Reviews:{" "}
        <span className={styles.subtitle}>
          {props.listName || "Booklist Placeholder"}
        </span>
      </h1>
      <ListSelector onUpdateList={updateListHandler} />
    </div>
  );
};

export default Header;
