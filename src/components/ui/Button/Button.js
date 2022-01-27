import styles from "./Button.module.css";

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
