import { Button, Card, LinearProgress } from "@mui/material";
import { useData } from "../../../../store/data-context";
import classes from "./EmailPreview.module.css";
import { Fragment, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RecipientCard from "./RecipientCard";
import SwipeableViews from "react-swipeable-views";

const isEmpty = (text) => {
  return text === "";
};
const EmailPreview = () => {
  const [index, setIndex] = useState(0);

  const dataCtx = useData();

  if (!dataCtx.data?.Sheet1) {
    return (
      <p className={classes.center}>
        No Excel File Uploaded or the excel file is empty
      </p>
    );
  } else if (
    isEmpty(dataCtx.fields.primaryKey) ||
    isEmpty(dataCtx.fields.emailIdField)
  ) {
    return (
      <p className={classes.center}>
        Enter the unique identifier and email Id field
      </p>
    );
  }
  const data = dataCtx.data.Sheet1?.slice(1).filter(
    (recipient) =>
      !dataCtx.neglectEmails.includes(recipient[0][dataCtx.fields.primaryKey])
  );

  const emailPreviews = [];
  data.forEach((recipient) => {
    emailPreviews.push(
      <RecipientCard key={Math.random()} index={index} recipient={recipient} />
    );
  });

  const onNextRecipientHandler = () => {
    if (index < data.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      setIndex(0);
    }
  };

  const onPrevRecipientHandler = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    } else {
      setIndex(data.length - 1);
    }
  };

  return (
    <Fragment>
      <LinearProgress
        className={classes.linearProgress}
        variant="determinate"
        style={{ width: "100%", backgroundColor: "rgb(182 188 226 / 0%)" }}
        value={(index / (emailPreviews?.length - 1)) * 100}
      />
      <div className={classes.emailPreview}>
        <div className={classes.navigationButton}>
          <Card>
            <Button onClick={onPrevRecipientHandler}>
              <ArrowBackIcon />
            </Button>
          </Card>
        </div>
        <div className={classes.emailContainer}>
          <SwipeableViews index={index}>{emailPreviews}</SwipeableViews>
        </div>
        <div className={classes.navigationButton}>
          <Card>
            <Button onClick={onNextRecipientHandler}>
              <ArrowForwardIcon />
            </Button>
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export default EmailPreview;
