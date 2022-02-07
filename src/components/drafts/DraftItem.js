import { Button } from "@mui/material";
import classes from "./DraftItem.module.css";
const DraftItem = (props) => {
  const date = new Date(props.date);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();
  const clickHandler = () => {};
  return (
    <Button onClick={clickHandler} className={classes.draftItem}>
      <div>
        <div>{month}</div>
        <div>{day}</div>
        <div>{year}</div>
      </div>
      <div>
        <div>{props.subject}</div>
      </div>
    </Button>
  );
};

export default DraftItem;
