import { Button } from "@material-ui/core";
import classes from "./SendEmail.module.css";
import { GoogleLogin, useGoogleLogout } from "react-google-login";
import { useData } from "../../../../store/data-context";
import ErrorModal from "../../../UI/ErrorModal";
import { Fragment, useState } from "react";
import instance from "../../../../axios";
import htmlTextConverter from "./htmlTextConverter";
import SuccessSnackbar from "./SuccessSnackbar";
import { useHistory } from "react-router";

const isEmpty = (text) => {
  return text === "";
};

const SendEmail = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loginResponse, setLoginResponse] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const dataCtx = useData();
  const handleResponse = (response) => {};
  const { signOut } = useGoogleLogout({
    scope: "https://mail.google.com/",
    clientId:
      CLIENT_ID,
    cookiePolicy: "single_host_origin",
    onSuccess: { handleResponse },
  });
  if (!dataCtx.data?.Sheet1) {
    return (
      <p className={classes.center}>
        No Excel File Uploaded or the excel file is empty
      </p>
    );
  } else if (
    isEmpty(dataCtx.fields.primaryKey) ||
    isEmpty(dataCtx.fields.emailIdField)
  ) {
    return (
      <p className={classes.center}>
        Enter the unique identifier and email Id field
      </p>
    );
  }
  const data = dataCtx.data.Sheet1?.slice(1).filter(
    (recipient) =>
      !dataCtx.neglectEmails.includes(recipient[0][dataCtx.fields.primaryKey])
  );

  const closeErrorModalHandler = () => {
    try {
      sendEmailHandler();
      dataCtx.showError({ hasError: false });
    } catch (error) {
      console.log(error);
    }
  };
  const hideBarHandler = () => {
    setIsOpen(false);
  };
  const sendEmailResponseHandler = (response) => {
    setIsSigningIn(true);
    try {
      if (response) {
        dataCtx.showError({
          hasError: true,
          errorTitle: "Confirm your email",
          errorMessage: `You are sending your mail from ${response.profileObj.email}`,
        });
        setSenderEmail(response.profileObj.email);
        setLoginResponse(response);
      }
    } catch (error) {
      dataCtx.showError({
        hasError: true,
        errorTitle: "Error",
        errorMessage:
          "Sorry, could't process the request due to some inconvenience",
      });
    }
    signOut();
    setIsSigningIn(false);
  };
  const sendEmailHandler = async () => {
    const mailData = data.map((recipient) => {
      const html = htmlTextConverter(dataCtx, recipient);
      const to = recipient[0][dataCtx.fields.emailIdField];
      return {
        html,
        to,
      };
    });

    if (!loginResponse.error) {
      const response = await instance({
        method: "POST",
        url: "/send-email",
        data: {
          _: encodeURIComponent(loginResponse.accessToken),
          mailData,
          subject: dataCtx.subject,
          from: senderEmail,
        },
      });

      if (response.data.errorMessages.length === 0) {
        setIsOpen(true);
        setIsSuccess(true);
      } else {
        setIsOpen(true);
        setIsSuccess(false);
      }
    }
  };
  return (
    <Fragment>
      {dataCtx.errorModal.hasError && (
        <ErrorModal
          buttonText={
            dataCtx.errorModal.errorTitle === "Confirm your email"
              ? "Confirm"
              : "Okay"
          }
          onConfirm={closeErrorModalHandler}
        />
      )}
      <div className={classes.sendEmail}>
        <Button>
          {isSigningIn ? (
            "Send Email"
          ) : (
            <GoogleLogin
              icon=""
              className={classes.sendEmailButton}
              scope="https://mail.google.com/"
              clientId=CLIENT_ID
              buttonText="Send email"
              cookiePolicy={"single-host-orgin"}
              onSuccess={sendEmailResponseHandler}
            />
          )}
        </Button>
      </div>
      <SuccessSnackbar
        isSuccess={isSuccess}
        isOpen={isOpen}
        hideBarHandler={hideBarHandler}
      />
    </Fragment>
  );
};

export default SendEmail;
