import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "./StatusTable.module.css";
import { CircularProgress } from "@mui/material";

export default function StatusTable(props) {
  const keys = Object.keys(props.statusData);
  return (
    <TableContainer
      style={{ maxHeight: 400 }}
      className={classes.container}
      component={Paper}
    >
      <Table
        stickyHeader
        style={{ fontFamily: "Urbanist" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {keys.map((key) => (
            <TableRow
              style={{
                background: `${
                  props.statusData[key]?.status
                    ? props.status === "success" || props.status === "failure"
                      ? "rgb(235 255 235)"
                      : "#faffc2"
                    : props.status === "requested"
                    ? "rgb(255 235 235)"
                    : props.status !== "sending"
                    ? "rgb(255 235 235)"
                    : ""
                }`,
              }}
              key={key}
            >
              <TableCell>{props.statusData[key]?.email}</TableCell>
              <TableCell>
                {props.statusData[key]?.status ? (
                  props.status === "success" || props.status === "failure" ? (
                    <div
                      style={{
                        padding: "2px 0",
                        fontWeight: "bold",
                        color: "green",
                      }}
                    >
                      Sent
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: "2px 0",
                        fontWeight: "bold",
                        color: "#939300",
                      }}
                    >
                      Requested
                    </div>
                  )
                ) : props.status === "sending" ? (
                  <div className={classes.circle}>
                    <CircularProgress
                      style={{
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "2px 0",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    Failed
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
