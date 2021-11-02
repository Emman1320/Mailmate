import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const signOutHandler = () => {
    auth.signOut();
  };
  return (
    <Fragment>
      <div className={classes.header}>
        <NavLink to="/dashboard">
          <div className={classes.logo}>Mailmate</div>
        </NavLink>
        <nav className={classes.nav}>
          {user ? (
            <span onClick={signOutHandler}>Sign Out</span>
          ) : (
            <NavLink to="/sign-in">
              <span>Sign In</span>
            </NavLink>
          )}
        </nav>
      </div>
    </Fragment>
  );
};

export default Header;
