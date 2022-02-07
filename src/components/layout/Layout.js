import classes from "./Layout.module.css";
import HouseIcon from "@mui/icons-material/House";
// import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";
import EmailIcon from "@mui/icons-material/Email";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Layout = (props) => {
  const { pathname } = useLocation();
  const style = { height: `${pathname === "/dashboard" ? "700%" : "auto"}` };
  return (
    <div className={classes.home}>
      <div className={classes.sidebar} style={style}>
        <NavLink to="/dashboard">
          <div className={pathname === "/dashboard" ? classes.active : ""}>
            <HouseIcon />
            <span>Dashboard</span>
          </div>
        </NavLink>
        {/* <NavLink to="/drafts">
          <div className={pathname === "/drafts" ? classes.active : ""}>
            <ChromeReaderModeOutlinedIcon />
            <span>Drafts</span>
          </div>
        </NavLink> */}
        <NavLink to="/send-email/upload-file">
          <div
            className={
              pathname === "/send-email/upload-file" ? classes.active : ""
            }
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
