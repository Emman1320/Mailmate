import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import TickAnimation from "../../../UI/TickAnimation";
import classes from "./Progress.module.css";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export default function Progress(props) {
  const keys = Object.keys(props.statusData);
  let count = 0;
  keys.forEach((key) => {
    if (props.statusData[key].status) count++;
  });
  const tickClass = `${classes.tick} ${
    props.status === "success" ? "" : classes.fail
  }`;

  let progressClass = "";
  if (props.status !== "sending" && props.status !== "requested")
    progressClass = `${
      props.status === "success"
        ? classes.linearProgressSuccess
        : classes.linearProgressFailure
    }`;
  const percent = Math.floor((count / keys.length) * 100 + 0.5);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {props.status === "sending" || props.status === "requested" ? (
          <FacebookCircularProgress />
        ) : (
          <TickAnimation className={tickClass} />
        )}
        <span style={{ marginLeft: "10px" }}>
          {count}/{keys.length} emails
          {props.status === "sending" || props.status === "requested"
            ? " requested"
            : " sent"}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <BorderLinearProgress
            className={progressClass}
            variant="determinate"
            value={percent}
          />
        </Box>
        <span style={{ marginLeft: "10px" }}>{percent}%</span>
      </div>
    </Box>
  );
}
