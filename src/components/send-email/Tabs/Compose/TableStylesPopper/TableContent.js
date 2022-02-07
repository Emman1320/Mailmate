import Grid from "@mui/material/Grid";
import classes from "./TableStyles.module.css";

const TableContent = () => {
  return (
    <Grid
      justify="space-evenly"
      alignItems="center"
      container
      className={classes.contentContainer}
    >
      <Grid item xs={2.4}>
        <div className={classes.content}></div>
      </Grid>
      <Grid item xs={2.4}>
        <div className={classes.content}></div>
      </Grid>
      <Grid item xs={2.4}>
        <div className={classes.content}></div>
      </Grid>
      <Grid item xs={2.4}>
        <div className={classes.content}></div>
      </Grid>
      <Grid item xs={2.4}>
        <div className={classes.content}></div>
      </Grid>
    </Grid>
  );
};

export default TableContent;
