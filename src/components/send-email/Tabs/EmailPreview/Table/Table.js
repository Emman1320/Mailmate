import { useData } from "../../../../../store/data-context";
import classes from "./Table.module.css";

const AddTable = (props) => {
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
          {props.recipient.map((row) => (
            <tr>
              {headerKeys.map((key) => (
                <td
                  style={{
                    border: `${dataCtx.tableStyle.body.border}`,
                    color: `${dataCtx.tableStyle.body.color}`,
                  }}
                >
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddTable;
