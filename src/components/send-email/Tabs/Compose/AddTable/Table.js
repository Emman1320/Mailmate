import { useData } from "../../../../../store/data-context";
import classes from "./Table.module.css";

const AddTable = (props) => {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const dataCtx = useData();
  const headerRow = dataCtx.data.Sheet1[0];
  const headerKeys = Object.keys(headerRow).filter(
    (key) => key !== dataCtx.fields.emailIdField
  );

  return (
    <div className={classes.table}>
      <table>
        <thead>
          <tr>
            {headerKeys.map((key) => (
              <th
                key={Math.random()}
                style={{
                  background: `${dataCtx.tableStyle.background}`,
                  border: `${dataCtx.tableStyle.header.border}`,
                  color: `${dataCtx.tableStyle.header.color}`,
                }}
              >
                {headerRow[key]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            /* {props.recipient.map((row) => ( */
            <tr key={Math.random()}>
              {headerKeys.map((key) => (
                <td
                  key={Math.random()}
                  style={{
                    border: `${dataCtx.tableStyle.body.border}`,
                    color: `${dataCtx.tableStyle.body.color}`,
                  }}
                >
                  {"<<" + headerRow[key] + ">>"}
                  <br />(
                  {props.recipient.length > 1 && props.recipient[1][key]
                    ? "Array "
                    : ""}
                  {capitalize(typeof props.recipient[0][key])})
                </td>
              ))}
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
};

export default AddTable;
