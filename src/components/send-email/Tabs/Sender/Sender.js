import classes from "./Sender.module.css";
import excelToJson from "../../../lib/excelToJson";
import { useData } from "../../../../store/data-context";
import SpecifyFieldModal from "./SpecifyFieldModal";
import { Fragment } from "react";
import TickAnimation from "../../../UI/TickAnimation";
import ErrorModal from "../../../UI/ErrorModal";

const Sender = () => {
  const dataCtx = useData();

  const convertExcelToObject = (file) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = new Uint8Array(event.target.result);
      let result = excelToJson({ source: data });
      dataCtx.saveData(result);
    };
    reader.readAsArrayBuffer(file);
  };

  const dropHandler = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    convertExcelToObject(file);
  };

  const chooseFileHandler = (event) => {
    const file = event.target.files[0];
    convertExcelToObject(file);
  };

  const dragOverHandler = (event) => {
    event.preventDefault();
  };

  // const closeModalHandler = () => {
  //   setShowModal(false);
  //   localStorage.setItem("showButton", true);
  //   setShowButton(true);
  // };
  // const showModalHandler = () => {
  //   setShowModal(true);
  // };

  const closeErrorModalHandler = () => {
    dataCtx.showError({ hasError: false });
  };
  // const onNextHandler = () => {
  //   if (!dataCtx.data.Sheet1) {
  //     dataCtx.showError({
  //       hasError: true,
  //       errorTitle: "Please upload your excel file",
  //       errorMessage: "No excel file found",
  //     });
  //   } else if (dataCtx.sender === "") {
  //     dataCtx.showError({
  //       hasError: true,
  //       errorTitle: "Select the sender",
  //       errorMessage: "Sender field is empty",
  //     });
  //   } else {
  //     history.push("/send-email/recipients");
  //   }
  // };

  const tickStateRender = <TickAnimation className={classes.marginTop} />; // Appears right after uploading

  return (
    <div className={classes.uploadFile}>
      {dataCtx.errorModal.hasError && (
        <ErrorModal onConfirm={closeErrorModalHandler} />
      )}
      <label>Upload your Excel file:</label>
      <div className={classes.uploadFile__uploadWrapper}>
        <label
          className={classes.uploadFile__uploadContainer}
          style={{ cursor: `${dataCtx.data.Sheet1 ? "auto" : "pointer"}` }}
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
          htmlFor="file"
        >
          <div className={classes.uploadFile__chooseFile}>
            <div className={classes.uploadFile__excelIcon}>
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 80"
                width="100px"
                height="100px"
              >
                <path d="M 45 9.792969 L 9 16.613281 L 9 63.386719 L 45 70.207031 L 45 63 L 69 63 L 69 17 L 45 17 Z M 43 12.207031 L 43 67.792969 L 11 61.730469 L 11 18.269531 Z M 40 15 C 39.449219 15 39 15.449219 39 16 C 39 16.550781 39.449219 17 40 17 C 40.550781 17 41 16.550781 41 16 C 41 15.449219 40.550781 15 40 15 Z M 40 19 C 39.449219 19 39 19.449219 39 20 C 39 20.550781 39.449219 21 40 21 C 40.550781 21 41 20.550781 41 20 C 41 19.449219 40.550781 19 40 19 Z M 45 19 L 67 19 L 67 61 L 45 61 L 45 53 L 49 53 L 49 51 L 45 51 L 45 45 L 49 45 L 49 43 L 45 43 L 45 37 L 49 37 L 49 35 L 45 35 L 45 29 L 49 29 L 49 27 L 45 27 Z M 40 23 C 39.449219 23 39 23.449219 39 24 C 39 24.550781 39.449219 25 40 25 C 40.550781 25 41 24.550781 41 24 C 41 23.449219 40.550781 23 40 23 Z M 40 27 C 39.449219 27 39 27.449219 39 28 C 39 28.550781 39.449219 29 40 29 C 40.550781 29 41 28.550781 41 28 C 41 27.449219 40.550781 27 40 27 Z M 51 27 L 51 29 L 62 29 L 62 27 Z M 17.453125 31 L 22.722656 40.035156 L 16.964844 49.066406 L 21.8125 49.066406 L 24.9375 43.234375 C 25.15625 42.671875 25.296875 42.25 25.355469 41.972656 L 25.40625 41.972656 C 25.53125 42.5625 25.652344 42.96875 25.769531 43.1875 L 28.882813 49.066406 L 33.707031 49.066406 L 28.140625 39.957031 L 33.558594 31 L 29.019531 31 L 26.144531 36.367188 C 25.871094 37.0625 25.679688 37.589844 25.578125 37.941406 L 25.53125 37.941406 C 25.371094 37.355469 25.191406 36.847656 24.988281 36.417969 L 22.40625 31 Z M 40 31 C 39.449219 31 39 31.449219 39 32 C 39 32.550781 39.449219 33 40 33 C 40.550781 33 41 32.550781 41 32 C 41 31.449219 40.550781 31 40 31 Z M 40 35 C 39.449219 35 39 35.449219 39 36 C 39 36.550781 39.449219 37 40 37 C 40.550781 37 41 36.550781 41 36 C 41 35.449219 40.550781 35 40 35 Z M 51 35 L 51 37 L 62 37 L 62 35 Z M 40 39 C 39.449219 39 39 39.449219 39 40 C 39 40.550781 39.449219 41 40 41 C 40.550781 41 41 40.550781 41 40 C 41 39.449219 40.550781 39 40 39 Z M 40 43 C 39.449219 43 39 43.449219 39 44 C 39 44.550781 39.449219 45 40 45 C 40.550781 45 41 44.550781 41 44 C 41 43.449219 40.550781 43 40 43 Z M 51 43 L 51 45 L 62 45 L 62 43 Z M 40 47 C 39.449219 47 39 47.449219 39 48 C 39 48.550781 39.449219 49 40 49 C 40.550781 49 41 48.550781 41 48 C 41 47.449219 40.550781 47 40 47 Z M 40 51 C 39.449219 51 39 51.449219 39 52 C 39 52.550781 39.449219 53 40 53 C 40.550781 53 41 52.550781 41 52 C 41 51.449219 40.550781 51 40 51 Z M 51 51 L 51 53 L 62 53 L 62 51 Z M 40 55 C 39.449219 55 39 55.449219 39 56 C 39 56.550781 39.449219 57 40 57 C 40.550781 57 41 56.550781 41 56 C 41 55.449219 40.550781 55 40 55 Z M 40 59 C 39.449219 59 39 59.449219 39 60 C 39 60.550781 39.449219 61 40 61 C 40.550781 61 41 60.550781 41 60 C 41 59.449219 40.550781 59 40 59 Z M 40 63 C 39.449219 63 39 63.449219 39 64 C 39 64.550781 39.449219 65 40 65 C 40.550781 65 41 64.550781 41 64 C 41 63.449219 40.550781 63 40 63 Z" />
              </svg>
            </div>
            {dataCtx.data.Sheet1 ? (
              <Fragment>{tickStateRender}</Fragment>
            ) : (
              <Fragment>
                <input
                  onChange={chooseFileHandler}
                  id="file"
                  type="file"
                  accept=".xlsx, .xls, .csv"
                />
                <div className={classes.uploadFile__chooseFileDesc}>
                  or drop excel files here
                </div>
              </Fragment>
            )}
          </div>
        </label>
      </div>
      {dataCtx.data.Sheet1?.length ? (
        <SpecifyFieldModal />
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  );
};

export default Sender;
