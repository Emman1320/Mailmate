import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.hideBarHandler(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={props.isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {props.isSuccess ? (
          <Alert onClose={handleClose} severity="success">
            Mail sent successfully!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Error! couldn't send the email
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
