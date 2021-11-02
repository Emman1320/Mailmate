import { reducer } from "./reducer";

const { createContext, useReducer, useContext } = require("react");

const initialState = {
  data: {},
  fields: {
    primaryKey: "",
    nameField: "",
    emailIdField: "",
  },
  neglectEmails: [],
  email: "",
  errorModal: {
    hasError: false,
    errorTitle: "",
    errorMessage: "",
  },
  caretPosition: 0,
  subject: "",
  body: "",
  footer: "",
  tableStyle: {
    background: "white",
    header: { border: "1px solid black", color: "black" },
    body: { border: "1px solid black", color: "black" },
  },
  showTable: false,
};

const DataContext = createContext({
  data: {},
  fields: { primaryKey: "", nameField: "", emailIdField: "" },
  sender: "",
  neglectEmails: [],
  saveData: () => {},
  saveField: () => {},
  neglectEmail: () => {},
  undoNeglectEmail: () => {},
  selectSender: () => {},
  showError: ({ hasError, errorTitle, errorMessage }) => {},
  errorModal: {
    hasError: "",
    errorTitle: "",
    errorMessage: "",
  },
  caretPosition: 0,
  updateCaretPosition: () => {},
  subject: "",
  addSubject: () => {},
  body: "",
  footer: "",
  addBody: () => {},
  addFooter: () => {},
  tableStyle: {
    background: "",
    header: { border: "", color: "" },
    body: { border: "", color: "" },
  },
  addTableStyle: () => {},
  showTable: false,
  setShowTable: () => {},
});

const DataContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onSaveData = (data) => {
    dispatch({ type: "SAVE_SHEET_DATA", data });
  };
  const onSaveField = (field) => {
    dispatch({ type: "ADD_FIELD", field });
  };
  const onNeglectEmail = (neglectEmail) => {
    dispatch({ type: "NEGLECT_EMAILS", neglectEmail });
  };
  const onUndoNeglectEmail = (primaryKey) => {
    dispatch({ type: "UNDO_NEGLECT_EMAILS", primaryKey });
  };
  const onSelectSender = (sender) => {
    dispatch({ type: "SENDER", sender });
  };
  const onShowError = (error) => {
    dispatch({ type: "HAS_ERROR", error });
  };
  const onUpdateCaretPosition = (caretPosition) => {
    dispatch({ type: "CARET", caretPosition });
  };
  const onAddSubject = (subject) => {
    dispatch({ type: "ADD_SUBJECT", subject });
  };
  const onAddBody = (body) => {
    dispatch({ type: "ADD_BODY", body });
  };
  const onAddFooter = (footer) => {
    dispatch({ type: "ADD_FOOTER", footer });
  };
  const onAddTableStyle = (style) => {
    dispatch({ type: "ADD_TABLE_STYLE", style });
  };
  const onSetShowTable = (showTable) => {
    dispatch({ type: "SHOW_TABLE", showTable });
  };

  const DataContextValue = {
    data: state.data,
    saveData: onSaveData,
    fields: state.fields,
    saveField: onSaveField,
    neglectEmails: state.neglectEmails,
    neglectEmail: onNeglectEmail,
    undoNeglectEmail: onUndoNeglectEmail,
    sender: state.sender,
    selectSender: onSelectSender,
    errorModal: state.errorModal,
    showError: onShowError,
    caretPosition: state.caretPosition,
    updateCaretPosition: onUpdateCaretPosition,
    subject: state.subject,
    body: state.body,
    footer: state.footer,
    addSubject: onAddSubject,
    addBody: onAddBody,
    addFooter: onAddFooter,
    tableStyle: state.tableStyle,
    addTableStyle: onAddTableStyle,
    showTable: state.showTable,
    setShowTable: onSetShowTable,
  };

  return (
    <DataContext.Provider value={DataContextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
export default DataContextProvider;
