import classes from "./SpecifyField.module.css";
import { useData } from "../../../../store/data-context";
import { Fragment, useState } from "react";
let origSpreadSheet;
const organizeData = (origData, primaryKey) => {
  const organizedData = [];
  const data = [...origData];
  organizedData.push(data[0]);
  let key_index = 1;
  for (let i = 2; i < data.length; i++) {
    if (data[i][primaryKey]) {
      organizedData.push(data.slice(key_index, i));
      key_index = i;
    }
  }
  organizedData.push(data.slice(key_index, data.length));
  return organizedData;
};
const SpecifyField = () => {
  const dataCtx = useData();
  const header = dataCtx.data.Sheet1 ? dataCtx.data.Sheet1[0] : {};
  if (!Array.isArray(dataCtx.data.Sheet1.slice(-1)[0])) {
    origSpreadSheet = dataCtx.data.Sheet1;
  }
  const headerKeys = Object.keys(header);
  let initialState = ["", "", ""];
  if (headerKeys.length) {
    initialState = [
      header[dataCtx.fields.primaryKey],
      header[dataCtx.fields.nameField],
      header[dataCtx.fields.emailIdField],
    ];
  }
  const [primaryKey, setPrimaryKey] = useState(initialState[0]);
  const [primaryKeyError, setPrimaryKeyError] = useState(false);
  const [nameField, setNameField] = useState(initialState[1]);
  const [emailId, setEmailId] = useState(initialState[2]);

  if (!dataCtx.data.Sheet1) {
    return <Fragment></Fragment>;
  }

  const options = (
    <Fragment>
      <option>Select a value</option>
      {headerKeys.map((key) => (
        <option key={Math.random()}>{header[key]}</option>
      ))}
    </Fragment>
  );

  const primaryKeySelectHandler = (event) => {
    const value = headerKeys.filter(
      (key) => header[key] === event.target.value
    )[0];
    dataCtx.saveField({ primaryKey: value });
    const organizedData = organizeData(origSpreadSheet, value);
    dataCtx.saveData({ Sheet1: organizedData });
    setPrimaryKey(event.target.value);
    const tmp = [organizedData.slice(1)[0][0][value]];
    let flag = true;
    organizedData.slice(2).forEach((recipient) => {
      if (tmp.includes(recipient[0][value]) && recipient[0][value]) {
        setPrimaryKeyError(true);
        flag = false;
        return;
      }
      tmp.push(recipient[0][value]);
    });
    if (flag) setPrimaryKeyError(false);
  };
  const emailIdFieldSelectHandler = (event) => {
    const value = headerKeys.filter(
      (key) => header[key] === event.target.value
    )[0];
    dataCtx.saveField({ emailIdField: value });
    setEmailId(event.target.value);
  };
  const nameFieldSelectHandler = (event) => {
    const value =
      headerKeys.filter((key) => header[key] === event.target.value)[0] || "";
    dataCtx.saveField({ nameField: value });
    setNameField(event.target.value);
  };
  return (
    <div className={classes.specifyField}>
      {primaryKeyError ? (
        <span className={classes.errorText}>
          This is not a proper unique identfier column (repeats itself a more
          than once). Choose a proper unique identifier column to avoid errors.
        </span>
      ) : (
        ""
      )}
      <div className={classes.dropdown}>
        <label>Choose an unique identifier:</label>

        <select value={primaryKey} onChange={primaryKeySelectHandler}>
          {options}
        </select>
      </div>
      <div className={classes.dropdown}>
        <label>Choose the name field(optional):</label>
        <select value={nameField} onChange={nameFieldSelectHandler}>
          {options}
        </select>
      </div>

      <div className={classes.dropdown}>
        <label>Choose the Email Id field:</label>
        <select value={emailId} onChange={emailIdFieldSelectHandler}>
          {options}
        </select>
      </div>
    </div>
  );
};

export default SpecifyField;
