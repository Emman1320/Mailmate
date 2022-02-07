import classes from "./TableStyles.module.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TableContent from "./TableContent";
import { useData } from "../../../../../store/data-context";

const Table = (props) => {
  const dataCtx = useData();

  const clickStyleHandler = () => {
    dataCtx.addTableStyle(props.tableStyle);
  };
  return (
    <Button onClick={clickStyleHandler}>
      <Grid
        container
        className={`${classes["tableContainer"]} ${
          classes[`table${props.tableNo}`]
        }`}
      >
        <Grid item xs={12} className={classes["header"]}>
          <TableContent />
        </Grid>
        <Grid item xs={12} className={classes["row"]}>
          <TableContent />
        </Grid>
        <Grid item xs={12} className={classes["row"]}>
          <TableContent />
        </Grid>
        <Grid item xs={12} className={classes["row"]}>
          <TableContent />
        </Grid>
        <Grid item xs={12} className={classes["row"]}>
          <TableContent />
        </Grid>
      </Grid>
    </Button>
  );
};

export default Table;
