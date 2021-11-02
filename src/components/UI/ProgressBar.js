import { Fragment } from "react";
import classes from "./ProgressBar.module.css";

const ProgressBar = (props) => {
  let progress = (+props.children / 100) * 360 + 180;
  const halfProgress = +props.children > 50;
  return (
    <Fragment>
      <div className={classes.progressBar}>
        <div className={classes.halfContainerWrapper}>
          <div className={classes.halfContainer}></div>
        </div>

        <div className={`${classes.wrapper} ${halfProgress && classes.width}`}>
          {!halfProgress && <div className={classes.container}></div>}
          <div
            className={`${classes.progressBarAnimation} ${classes["fill-container"]}`}
            style={{ transform: `rotate(${progress}deg)` }}
          >
            <div className={classes["fill-wrapper"]}>
              <div className={classes.fill}></div>
            </div>
          </div>
          {halfProgress && (
            <div
              className={`${classes.progressBarAnimation} ${classes["fill-container2"]}`}
            >
              <div className={classes["fill-wrapper"]}>
                <div className={classes.fill}></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <span
        className={classes.progressPercent}
        style={{ right: `${+props.children === 100 ? "-56px" : ""}` }}
      >
        {props.children}%
      </span>
    </Fragment>
  );
};

export default ProgressBar;
