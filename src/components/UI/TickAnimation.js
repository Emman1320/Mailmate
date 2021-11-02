import classes from "./TickAnimation.module.css";

const TickAnimation = (props) => {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <svg x="0px" y="0px" viewBox="0 0 37 37" className={classes.svg}>
        <path
          className={`${classes.circ} ${classes.path}`}
          d="
	M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
        />
        <polyline
          className={`${classes.tick} ${classes.path}`}
          points="
	11.6,20 15.9,24.2 26.4,13.8 "
        />
      </svg>
    </div>
  );
};

export default TickAnimation;
