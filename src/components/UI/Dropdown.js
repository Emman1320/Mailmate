import React from "react";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useData } from "../../store/data-context";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    fontSize: "1.2rem",
    fontFamily: "Urbanist, sans-serif",
  },
  menuItem: {
    fontSize: "1.2rem",
    fontFamily: "Urbanist, sans-serif",
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const dataCtx = useData();
  const handleChange = (event) => {
    dataCtx.selectSender(event.target.value);
    if (!event.target.value) {
      props.showError();
    } else {
      props.hideError();
    }
  };

  return (
    <div>
      <FormControl className={classes.formControl} error={props.hasError}>
        <Select
          value={dataCtx.sender}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem className={classes.menuItem} value="">
            <span>Select a sender</span>
          </MenuItem>
          <MenuItem className={classes.menuItem} value={10}>
            Emman,&nbsp; emmanueldavid1320@gmail.com
          </MenuItem>
          <MenuItem className={classes.menuItem} value={20}>
            Tabi,&nbsp; tabitha@gmail.com
          </MenuItem>
          <MenuItem className={classes.menuItem} value={30}>
            Amma,&nbsp; emman.tabi@gmail.com
          </MenuItem>
          <MenuItem className={classes.menuItem} value={30}>
            Appa,&nbsp; anbutneb1970@gmail.com
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
