import classes from "./SendEmailLayout.module.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useState } from "react";
import TabPanel from "./TabPanel";
import SendEmailNavBar from "./SendEmailNavBar";
import UploadFile from "../Tabs/UploadFile/UploadFile";
import Recipients from "../Tabs/Recipients/Recipients";
import Compose from "../Tabs/Compose/Compose";
import EmailPreview from "../Tabs/EmailPreview/EmailPreview";
import SendEmail from "../Tabs/SendEmail/SendEmail";

const SendEmailLayout = (props) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const tabList = [
    "upload-file",
    "recipients",
    "compose",
    "email-preview",
    "send",
  ];
  const index = tabList.findIndex((tab) => pathname === `/send-email/${tab}`);
  const [value, setValue] = useState(index || 0);
  const tabChangeHandler = (newValue) => {
    setValue(newValue);
  };
  let sendEmailContainerHeight = {
    height: `${pathname === "/send-email/compose" ? "46em" : "34em"}`,
  };
  if (pathname === "/send-email/") {
    history.push("/send-email/upload-file")
  }
  return (
    <div
      className={classes.sendEmailContainer}
      style={sendEmailContainerHeight}
    >
      <Router>
        <SendEmailNavBar
          tabList={tabList}
          onTabChangeHandler={tabChangeHandler}
          value={value}
        />
        <Switch>
          <TabPanel value={value} index={value}>
            <Route path="/send-email/upload-file">
              <UploadFile />
            </Route>
            <Route path="/send-email/recipients">
              <Recipients />
            </Route>
            <Route path="/send-email/compose">
              <Compose />
            </Route>
            <Route path="/send-email/email-preview">
              <EmailPreview />
            </Route>
            <Route path="/send-email/send">
              <SendEmail />
            </Route>
          </TabPanel>
        </Switch>
      </Router>
    </div>
  );
};

export default SendEmailLayout;
