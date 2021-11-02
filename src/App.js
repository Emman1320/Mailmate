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
  // window.onbeforeunload = (event) => {
  //   const e = event || window.event;
  //   e.preventDefault();
    
  //   if (e) {
  //     e.returnValue = "";
  //   }
  //   return "";
  // };
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log(authUser);
      if (authUser) {
        dispatch(userActions.saveUser(authUser));
      } else {
        dispatch(userActions.saveUser(null));
        return;
      }
    });
    // if (user) {
    //   const fetchDrafts = async () => {
    //     const response = await fetch(
    //       "http://localhost:5001/mail-mate/us-central1/api",
    //       {
    //         method: "GET",
    //         // body: JSON.stringify({
    //         //   draft: [
    //         //     {
    //         //       date: new Date(),
    //         //       fields: {
    //         //         primaryKey: "A",
    //         //         nameField: "B",
    //         //         emailField: "C",
    //         //       },
    //         //       neglectedEmails: [],
    //         //       subject: "Subject",
    //         //       body: "Body",
    //         //       footer: "",
    //         //       tableStyle: {
    //         //         background: "white",
    //         //         header: { border: "1px solid black", color: "black" },
    //         //         body: { border: "1px solid black", color: "black" },
    //         //       },
    //         //       showTable: false,
    //         //     },
    //         //   ],
    //         // }),
    //         // headers: { "Content-Type": "application/json" },
    //       }
    //     );
    //     const data = await response.json();
    //     const userDraftsData = data.filter(
    //       (dataItem) => dataItem.email === user.email
    //     )[0];
    //     dispatch(requestActions.saveData(userDraftsData.draft));
    //   };
    //   fetchDrafts().catch((error) => console.log(error));
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Switch>
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
