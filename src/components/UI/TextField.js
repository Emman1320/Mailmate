import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useData } from "../../store/data-context";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      width: "80ch",
    },
  },
}));

export default function MultilineTextField() {
  const classes = useStyles();

  const dataCtx = useData();
  const handleChange = (event) => {
    dataCtx.addSubject(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-multiline-flexible"
          label="Add Subject"
          multiline
          maxRows={4}
          value={dataCtx.subject}
          style={{ fontSize: "1.3em" }}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </form>
  );
}
