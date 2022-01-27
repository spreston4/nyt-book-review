import styles from "./Button.module.css";

// Reusable button component. Inherits className and Onclick from parent. Send prop 'alt={true}' for alternate styling.
const Button = (props) => {
  const buttonClasses = `${styles.button} ${props.className} ${
    props.alt ? styles.alt : ""
  }`;

  return (
    <button
      className={buttonClasses}
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
