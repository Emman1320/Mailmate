import classes from "./RecipientCard.module.css";
import { Card } from "@mui/material";
import { useData } from "../../../../store/data-context";
import { TextCompiler } from "../../../lib/TextCompiler";
import Table from "./Table/Table";

const RecipientCard = (props) => {
  const dataCtx = useData();
  const recipient = props.recipient[0];
  const body = TextCompiler(dataCtx.body + "\n", recipient);
  const footer = TextCompiler(dataCtx.footer, recipient);
  const subject = TextCompiler(dataCtx.subject, recipient);

  return (
    <Card className={classes.card} elevation={2}>
      <div className={classes.toAddress}>
        <strong>To: </strong>
        {props.recipient[0][dataCtx.fields.emailIdField]}
      </div>
      <div className={classes.subject}>
        {dataCtx.subject ? subject : "(no subject)"}
      </div>
      <div className={classes.body}>
        {dataCtx.body ? body : dataCtx.showTable ? "" : "(no body)"}
        {dataCtx.showTable && <Table {...props} />}
        {dataCtx.footer && footer}
      </div>
    </Card>
  );
};

export default RecipientCard;
