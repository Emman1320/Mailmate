import { Fragment } from "react";
import { useData } from "../../store/data-context";
import { messageToHtmlConverter } from "../send-email/Tabs/SendEmail/htmlTextConverter";

export const TextCompiler = (text, data) => {
  const dataCtx = useData();
  const header = dataCtx.data.Sheet1[0];
  const keys = Object.keys(header);
  const variables = keys.map((key) => ["<<" + header[key] + ">>", data[key]]);
  variables.forEach((variable) => {
    text = text.split(variable[0]).join(variable[1]);
  });

  // text = (
  //   <div>
  //     {[...text].map((character) => {
  //       if (character === " ") {
  //         return <Fragment>&nbsp;</Fragment>;
  //       }
  //       if (character === "\n") {
  //         return <br />;
  //       }
  //       return character;
  //     })}
  //   </div>
  // );
  
  text = messageToHtmlConverter(text);
  return text;
};
