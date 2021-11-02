import React from "react";
import Popper from "@material-ui/core/Popper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Table from "./Table";

export default function TableStylesPopper(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const styles = {
    1: {
      background: "black",
      body: { border: "1px solid black", color: "black" },
      header: { border: "1px solid white", color: "white" },
    },
    2: {
      background: "#5D9BD5",
      body: { border: "1px solid #5D9BD5", color: "black" },
      header: { border: "1px solid white", color: "white" },
    },
    3: {
      background: "#ED7C31",
      body: { border: "1px solid #ED7C31", color: "black" },
      header: { border: "1px solid white", color: "white" },
    },
    4: {
      background: "#FFBF00",
      body: { border: "1px solid #FFBF00", color: "black" },
      header: { border: "1px solid white", color: "white" },
    },
    5: {
      background: "rgb(0, 211, 148)",
      body: { border: "1px solid rgb(0, 211, 148)", color: "black" },
      header: { border: "1px solid white", color: "white" },
    },
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };
  const tableNoArray = Object.keys(styles);
  return (
    <div>
      <Popper
        onMouseLeave={handleClick}
        open={open}
        anchorEl={anchorEl}
        placement="top"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{ padding: "10px" }}>
              <Grid container spacing={1}>
                {tableNoArray.map((tableNo) => (
                  <Grid key={Math.random()} item xs={2.4}>
                    <Table tableNo={tableNo} tableStyle={styles[tableNo]} />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Grid container justifyContent="center">
        <Grid item>
          <Button disabled={props.disabled} onClick={handleClick}>
            Table Styles
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
