const messageToHtmlConverter = (text) => {
  let htmlText = "";
  [...text].forEach((character) => {
    if (character === " ") htmlText += "&nbsp;";
    else if (character === "\n") htmlText += "<br/>";
    else if (character === "\t") htmlText += "&nbsp;&nbsp;&nbsp;&nbsp;";
    else htmlText += character;
  });
  return htmlText;
};

const htmlTextConverter = (dataCtx, recipientData) => {
  const tableData = dataCtx.data.Sheet1;
  const headerRow = tableData[0];
  const keys = Object.keys(headerRow).filter(
    (key) => key !== dataCtx.fields.emailIdField
  );
  const variables = [];

  keys.forEach((key) => {
    variables.push(["<<" + headerRow[key] + ">>", recipientData[0][key]]);
  });
  let body = dataCtx.body;
  let footer = dataCtx.footer;
  variables.forEach((variable) => {
    body = body.split(variable[0]).join(variable[1]);
    footer = footer.split(variable[0]).join(variable[1]);
  });
  body = messageToHtmlConverter(body);
  footer = messageToHtmlConverter(footer);
  const style = `
  <head>
      <style>
            .table thead th { 
                text-align: left;
              } 
            .table {
              background-color: white; 
              width: 85%;
              padding-top: 1em; 
              border-spacing: 1px;
              border-collapse: collapse;
            }
            .table td,.table th {
              border: 1px solid #ddd;
              padding: 8px;
            }
            .table tr td{
              border: ${dataCtx.tableStyle.body.border}; 
              color: ${dataCtx.tableStyle.body.color};
            }
            .table th{
              padding-top: 12px;
              padding-bottom: 12px;
              text-align: left;
              background: ${dataCtx.tableStyle.background};
              border: ${dataCtx.tableStyle.header.border}; 
              color: ${dataCtx.tableStyle.header.color};
            }
           </style></head>`;
  let tableHtml = "";
  if (dataCtx.showTable) {
    tableHtml += "<table class='table'><thead><tr>";

    keys.forEach((key) => {
      tableHtml += `<th>${headerRow[key]}</th>`;
    });
    tableHtml += "</tr></thead><tbody>";
    recipientData.forEach((recipient, index) => {
      if ((index + 1) % 2 === 0) {
        tableHtml += "<tr style='background-color: #f2f2f2'>";
      } else {
        tableHtml += "<tr>";
      }
      keys.forEach((key) => {
        const cellData = recipient[key] ? recipient[key] : "";
        tableHtml += `<td>${cellData}</td>`;
      });
      tableHtml += "</tr>";
    });
    tableHtml += "</tbody></table>";
  }

  const html = `${style}<body><div>${body}</div>${tableHtml}<div>${footer}</div></body>`;
  return html;
};

export default htmlTextConverter;
