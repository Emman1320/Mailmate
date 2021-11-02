import Button from "./Button";
import classes from "./FieldModal.module.css";
import { Fragment, useState } from "react";

const FieldModal = (props) => {
  const [animationClassName, setAnimationClassName] = useState("");
  const confirmHandler = () => {
    setAnimationClassName("closeAnimation");
    setTimeout(() => {
      props.onConfirm();
    }, 320);
  };
  return (
    <Fragment>
      <div className={`${classes.backdrop} ${classes[animationClassName]}`} />
      <div className={`${classes.modal} ${classes[animationClassName]}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>{props.children}</div>
        <footer className={classes.actions}>
          <Button onClick={confirmHandler}>Confirm</Button>
        </footer>
      </div>
    </Fragment>
  );
};


export default FieldModal;
