import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import SendEmailLayout from "./components/send-email/sendEmailLayout/SendEmailLayout";
import Drafts from "./components/drafts/Drafts";
import { Fragment, useEffect } from "react";
import RedirectToDashboard from "./components/Redirects/RedirectToDashboard";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { userActions } from "./redux-store/user";

function App() {
const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(userActions.saveUser(authUser));
      } else {
        dispatch(userActions.saveUser(null));
        return;
      }
    });
  }, []);

  return (
    <Router>
      <Switch>
        {" "}
        <Route path="/" exact>
          <RedirectToDashboard />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/dashboard">
          {!user ? (
            <SignIn />
          ) : (
            <Fragment>
              <Header />
              <Layout>
                <Dashboard />
              </Layout>
            </Fragment>
          )}
        </Route>
        <Route path="/drafts">
          {!user ? (
            <SignIn />
          ) : (
            <Fragment>
              <Header />
              <Layout>
                <Drafts />
              </Layout>
            </Fragment>
          )}
        </Route>
        <Route path="/send-email/">
          {!user ? (
            <SignIn />
          ) : (
            <Fragment>
              <Header />
              <Layout>
                <SendEmailLayout />
              </Layout>
            </Fragment>
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
