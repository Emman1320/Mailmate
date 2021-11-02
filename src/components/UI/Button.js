import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${classes.Button} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
