import classes from "./SpecifyFieldModal.module.css";
import { useData } from "../../../../store/data-context";
import { Fragment, useState } from "react";
const organizeData = (data, primaryKey) => {
  const organizedData = [];
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
const SpecifyFieldModal = (props) => {
  const dataCtx = useData();
  const header = dataCtx.data.Sheet1 ? dataCtx.data.Sheet1[0] : {};
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
    const organizedData = organizeData(dataCtx.data.Sheet1, value);
    dataCtx.saveData({ Sheet1: organizedData });
    setPrimaryKey(event.target.value);
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

export default SpecifyFieldModal;
