import { useData } from "../../../../store/data-context";
import Recipient from "./Recipient";
import classes from "./Recipients.module.css";
import React, { Fragment } from "react";

const isEmpty = (text) => {
  return text === "";
};

const Recipients = () => {
  const { data, fields } = useData();
  if (!data?.Sheet1) {
    return (
      <p className={classes.center}>
        No Excel File Uploaded or the excel file is empty
      </p>
    );
  } else if (isEmpty(fields.primaryKey) || isEmpty(fields.emailIdField)) {
    return (
      <p className={classes.center}>
        Enter the unique identifier and email Id field
      </p>
    );
  }
  const headerRow = data.Sheet1[0];
  const tableBody = data.Sheet1.slice(1);
  const tableBodyOverflow = tableBody.length >= 9;
  return (
    <Fragment>
      <div
        className={classes.recipientsWrapper}
        style={{ overflowY: `${tableBodyOverflow ? "scroll" : "hidden"}` }}
      >
        <table className={classes.recipients}>
          <thead>
            <tr className={classes.header}>
              <th>{headerRow[fields.primaryKey]}</th>
              {fields.nameField ? <th>{headerRow[fields.nameField]}</th> : ""}
              <th>{headerRow[fields.emailIdField]}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableBody.map((recipient) => {
              return recipient.map((row) => {
                if (!row[fields.primaryKey]) {
                  return <Fragment></Fragment>;
                }
                return (
                  <Recipient
                    key={Math.random()}
                    primaryKey={row[fields.primaryKey]}
                    name={row[fields.nameField]}
                    emailId={row[fields.emailIdField]}
                  />
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Recipients;
