import { Button } from "@mui/material";
import classes from "./ErrorModal.module.css";
import { Fragment, useState } from "react";
import { useData } from "../../store/data-context";

const ErrorModal = (props) => {
  const [animationClassName, setAnimationClassName] = useState("");
  const dataCtx = useData();
  const errorModal = dataCtx.errorModal;
  const confirmHandler = () => {
    setAnimationClassName("closeAnimation");
    setTimeout(() => {
      props.onConfirm();
    }, 120);
  };
  return (
    <Fragment>
      <div className={`${classes.backdrop} ${classes[animationClassName]}`} />
      <div className={`${classes.modal} ${classes[animationClassName]}`}>
        <header className={classes.header}>
          <h2>{errorModal.errorTitle}</h2>
        </header>
        <div className={classes.content}>{errorModal.errorMessage}</div>
        <footer className={classes.actions}>
          <Button onClick={confirmHandler}>{props.buttonText}</Button>
        </footer>
      </div>
    </Fragment>
  );
};

export default ErrorModal;
