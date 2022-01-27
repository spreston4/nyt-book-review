import styles from "./Card.module.css";

// Reusable card component. Inherits className from parent. Send prop 'alt={true}' for alternate styling.
const Card = (props) => {
  const cardClasses = `${styles.card} ${props.className} ${
    props.alt ? styles.alt : ""}`;

  return <div className={cardClasses}>{props.children}</div>;
};

export default Card;
