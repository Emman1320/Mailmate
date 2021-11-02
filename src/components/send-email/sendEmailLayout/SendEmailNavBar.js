import classes from "./SendEmailNavBar.module.css";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const SendEmailNavBar = ({ value, onTabChangeHandler, tabList }) => {
  const history = useHistory();

  const tabValueChangeHandler = (event, newValue) => {
    onTabChangeHandler(newValue);
    history.push(tabList[newValue]);
  };
  
  // useEffect(() => {
  //   return history.listen((location) => {
  //     console.log(`You changed the page to: ${location.pathname}`);
  //     const tab = location.pathname.split("/send-email/")[1];
  //     // let dataToBeUploaded = {};

  //     switch (tab) {
  //       case "upload-file":
  //         break;
  //       default:
  //         console.log("Wrong tab!!");
  //     }
  //   });
  // }, [history]);
  return (
    <AppBar
      style={{ backgroundColor: "rgb(1 82 189 / 88%)", zIndex: "0" }}
      className={classes.navBar}
      position="static"
    >
      <Tabs
        className={classes.tabs}
        value={value}
        onChange={tabValueChangeHandler}
        aria-label="simple tabs example"
      >
        <Tab label="upload file" {...a11yProps(0)} />
        <Tab label="recipients" {...a11yProps(1)} />
        <Tab label="compose" {...a11yProps(2)} />
        <Tab label="email preview" {...a11yProps(3)} />
        <Tab label="send" {...a11yProps(4)} />
      </Tabs>
    </AppBar>
  );
};

export default SendEmailNavBar;
