import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import { useData } from "../../../../store/data-context";
import classes from "./Recipient.module.css";

const Recipient = ({ primaryKey, name, emailId }) => {
  const dataCtx = useData();
  const [isChecked, setIsChecked] = useState(
    !dataCtx.neglectEmails.includes(primaryKey)
  );

  const checkboxValueChangeHandler = (event) => {
    setIsChecked(event.target.checked);
    if (!event.target.checked) {
      dataCtx.neglectEmail(primaryKey);
    } else {
      dataCtx.undoNeglectEmail(primaryKey);
    }
  };

  return (
    <tr>
      <td>{primaryKey}</td>
      {dataCtx.fields.nameField ? <td>{name}</td> : ""}
      <td>{emailId}</td>
      <td>
        <label className={classes["container"]}>
          <Checkbox checked={isChecked} onChange={checkboxValueChangeHandler} />
        </label>
      </td>
    </tr>
  );
};

export default React.memo(Recipient);
