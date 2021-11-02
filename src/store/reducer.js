export const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "CARET":
      return {
        ...state,
        caretPosition: action.caretPosition,
      };
    case "SAVE_SHEET_DATA":
      return {
        ...state,
        data: action.data,
      };
    case "ADD_FIELD":
      return {
        ...state,
        fields: { ...state.fields, ...action.field },
      };
    case "HAS_ERROR":
      return {
        ...state,
        errorModal: { ...state.errorModal, ...action.error },
      };
    case "NEGLECT_EMAILS":
      return {
        ...state,
        neglectEmails: [...state.neglectEmails, action.neglectEmail],
      };
    case "UNDO_NEGLECT_EMAILS":
      const updatedNeglectEmails = state.neglectEmails.filter(
        (primaryKey) => primaryKey !== action.primaryKey
      );
      return {
        ...state,
        neglectEmails: updatedNeglectEmails,
      };
    case "SENDER":
      return {
        ...state,
        sender: action.sender,
      };
    case "ADD_SUBJECT":
      return {
        ...state,
        subject: action.subject,
      };
    case "ADD_BODY":
      return {
        ...state,
        body: action.body,
      };
    case "ADD_FOOTER":
      return {
        ...state,
        footer: action.footer,
      };
    case "SHOW_TABLE":
      return {
        ...state,
        showTable: action.showTable,
      };
    case "ADD_TABLE_STYLE":
      return {
        ...state,
        tableStyle: action.style,
      };
    default:
      return state;
  }
};
