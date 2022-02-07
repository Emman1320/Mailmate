import classes from "./Compose.module.css";
import { Fragment, useEffect, useRef, useState } from "react";
import { useData } from "../../../../store/data-context";
import { TextareaAutosize, Card } from "@mui/material";
import MaterialButton from "@mui/material/Button";

import MultilineTextField from "../../../UI/TextField";
import AddTable from "./AddTable/Table";
import SimpleMenu from "../../../UI/SimpleMenu";
import TableStylesPopper from "./TableStylesPopper/TableStylesPopper";

const isEmpty = (text) => {
  return text === "";
};

const Compose = () => {
  const dataCtx = useData();
  const [enteredBody, setEnteredBody] = useState(dataCtx.body);
  const [enteredFooter, setEnteredFooter] = useState(dataCtx.footer);
  const [showTable, setShowTable] = useState(dataCtx.showTable);
  const [caretPosition, setCaretPosition] = useState(dataCtx.caretPosition);
  const [focusOn, setFocusOn] = useState(null);
  const bodyRef = useRef();
  const footerRef = useRef();
  let variablesMenu = [];
  if (dataCtx.data.Sheet1) {
    variablesMenu = Object.values(dataCtx.data.Sheet1[0]).map(
      (value) => "<<" + value + ">>"
    );
  }

  useEffect(() => {
    let composeTimer = setTimeout(() => {
      dataCtx.addBody(enteredBody);
      dataCtx.addFooter(enteredFooter);
      dataCtx.updateCaretPosition(caretPosition);
    }, 200);
    return () => {
      clearTimeout(composeTimer);
    };
  }, [caretPosition, enteredBody, enteredFooter]);

  useEffect(() => {
    if (showTable) {
      footerRef.current.focus();
      setFocusOn("footer");
    }
  }, [showTable]);
  if (!dataCtx.data?.Sheet1) {
    return (
      <p className={classes.center}>
        No Excel File Uploaded or the excel file is empty
      </p>
    );
  } else if (
    isEmpty(dataCtx.fields.primaryKey) ||
    isEmpty(dataCtx.fields.emailIdField)
  ) {
    return (
      <p className={classes.center}>
        Enter the unique identifier and email Id field
      </p>
    );
  }
  const bodyChangeHandler = (event) => {
    setEnteredBody(event.target.value);
    setCaretPosition(event.target.selectionStart);
  };
  const footerChangeHandler = (event) => {
    setEnteredFooter(event.target.value);
    setCaretPosition(event.target.selectionStart);
  };

  const insertTableHandler = () => {
    setShowTable(true);
    dataCtx.setShowTable(true);
    setFocusOn("footer");
    footerRef.current.focus();
  };
  const removeTableHandler = () => {
    setEnteredBody((prevState) => prevState + enteredFooter);
    setEnteredFooter("");
    setShowTable(false);
    dataCtx.setShowTable(false);
    bodyRef.current.focus();
    setFocusOn("body");
  };
  const keyDownHandler = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setEnteredBody((prevState) => prevState + "    ");
      setEnteredFooter((prevState) => prevState + "    ");
    }
    if (event.key === "Backspace" && showTable && enteredFooter.length === 0) {
      bodyRef.current.focus();
    }
    if (event.key === "ArrowLeft") {
      setCaretPosition((prevState) => prevState - 1);
    }
    if (event.key === "ArrowRight") {
      setCaretPosition((prevState) => prevState + 1);
    }
  };
  const focusHandler = (event) => {
    if (event.target.id === "body" && focusOn !== "body") {
      setFocusOn("body");
    }
    if (event.target.id === "footer" && focusOn !== "footer") {
      setFocusOn("footer");
    }
  };
  const clickHandler = (event) => {
    setCaretPosition(event.target.selectionStart);
  };
  const variablesHandler = (variable) => {
    if (focusOn === "footer") {
      setEnteredFooter(
        (prevState) =>
          prevState.slice(0, caretPosition) +
          variable +
          prevState.slice(caretPosition)
      );
      return;
    }
    if (focusOn === "body") {
      setEnteredBody(
        (prevState) =>
          prevState.slice(0, caretPosition) +
          variable +
          prevState.slice(caretPosition)
      );
    }
  };
  const blurHandler = (event) => {
    setCaretPosition(event.target.selectionStart);
  };
  //   const saveDraftHandler =async () => { const response = await fetch(
  //     "http://localhost:5001/mail-mate/us-central1/api",
  //     {
  //       method: "GET",
  //       // body: JSON.stringify({
  //       //   draft: [
  //       //     {
  //       //       date: new Date(),
  //       //       fields: {
  //       //         primaryKey: "A",
  //       //         nameField: "B",
  //       //         emailField: "C",
  //       //       },
  //       //       neglectedEmails: [],
  //       //       subject: "Subject",
  //       //       body: "Body",
  //       //       footer: "",
  //       //       tableStyle: {
  //       //         background: "white",
  //       //         header: { border: "1px solid black", color: "black" },
  //       //         body: { border: "1px solid black", color: "black" },
  //       //       },
  //       //       showTable: false,
  //       //     },
  //       //   ],
  //       // }),
  //       // headers: { "Content-Type": "application/json" },
  //     }
  //   );
  //   console.log(userDraftsData.draft, data, user.email);
  //   dispatch(requestActions.saveData(userDraftsData.draft));
  // };
  return (
    <Fragment>
      <div className={classes.body}>
        <div className={classes.bodySubject}>
          <MultilineTextField />
        </div>

        <label>Add Body:</label>
        <Card className={classes.bodyMessageTopBar}>
          <div className={classes.bodyMessageStyleChanger}>
            <TableStylesPopper disabled={!showTable} />
          </div>
          <div className={classes.bodyMessageActions}>
            <SimpleMenu
              onSelectVariable={variablesHandler}
              menu={variablesMenu}
            >
              Variables
            </SimpleMenu>
            {showTable ? (
              <MaterialButton onClick={removeTableHandler}>
                Remove Table
              </MaterialButton>
            ) : (
              <MaterialButton onClick={insertTableHandler}>
                Insert Table
              </MaterialButton>
            )}
          </div>
        </Card>

        <label
          htmlFor={showTable ? "footer" : "body"}
          className={classes.bodyMessageWrapper}
        >
          <div className={classes.bodyMessage} onBlur={blurHandler}>
            <TextareaAutosize
              id="body"
              aria-label="empty textarea"
              ref={bodyRef}
              onFocus={focusHandler}
              value={enteredBody}
              onKeyDown={keyDownHandler}
              onChange={bodyChangeHandler}
              onClick={clickHandler}
              className={classes.bodyTextarea}
            ></TextareaAutosize>
            {showTable && (
              <Fragment>
                <AddTable recipient={dataCtx.data.Sheet1[1]} />
              </Fragment>
            )}

            <TextareaAutosize
              aria-label="empty textarea"
              id="footer"
              ref={footerRef}
              value={enteredFooter}
              style={{ display: `${showTable ? "block" : "none"}` }}
              onKeyDown={keyDownHandler}
              onChange={footerChangeHandler}
              className={classes.bodyTextarea}
            ></TextareaAutosize>
          </div>
        </label>
        {/* <div className={classes.draft}>
          <Button >Save As Draft</Button>
        </div> */}
      </div>
    </Fragment>
  );
};
export default Compose;
