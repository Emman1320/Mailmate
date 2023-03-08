import { useRouter } from "next/router";
import classes from "./Tab.module.css";

const Tab = (props) => {
  const router = useRouter();
  const isActive = `/send-email/${props.path}` === router.pathname;
  const clickHandler = () => {
    router.push(`/send-email/${props.path}`);
    
  };
  return (
    <div
      className={`${classes.tab} ${isActive && classes.active}`}
      onClick={clickHandler}
    >
      <div className={classes.title}>{props.children}</div>
      {isActive && (
        <div className={classes.bottomOttuContainer}>
          <div className={classes.bottomOttu}></div>
        </div>
      )}
    </div>
  );
};

export default Tab;
