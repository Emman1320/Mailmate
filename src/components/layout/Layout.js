import classes from "./Layout.module.css";
import HouseIcon from "@material-ui/icons/House";
import ChromeReaderModeOutlinedIcon from "@material-ui/icons/ChromeReaderModeOutlined";
import EmailIcon from "@material-ui/icons/Email";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Layout = (props) => {
  const { pathname } = useLocation();
 
  return (
    <div className={classes.home}>
      <div className={classes.sidebar}>
        <NavLink to="/dashboard">
          <div className={pathname === "/dashboard" ? classes.active : ""}>
            <HouseIcon />
            <span>Dashboard</span>
          </div>
        </NavLink>
        <NavLink to="/drafts">
          <div className={pathname === "/drafts" ? classes.active : ""}>
            <ChromeReaderModeOutlinedIcon />
            <span>Drafts</span>
          </div>
        </NavLink>
        <NavLink to="/send-email/upload-file">
          <div
            className={pathname === "/send-email/upload-file" ? classes.active : ""}
          >
            <EmailIcon />
            <span>Send Email</span>
          </div>
        </NavLink>
        {/* <NavLink to="/settings">
          <div className={pathname === "/settings" ? classes.active : ""}>
            <SettingsIcon />
            <span>Settings</span>
          </div>
        </NavLink> */}
      </div>

      <div className={classes.main}>{props.children}</div>
    </div>
  );
};

export default Layout;
