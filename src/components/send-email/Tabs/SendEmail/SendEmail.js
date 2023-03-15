import { Button, CircularProgress } from "@mui/material";
import classes from "./SendEmail.module.css";
import { GoogleLogin, useGoogleLogout } from "react-google-login";
import { useData } from "../../../../store/data-context";
import ErrorModal from "../../../UI/ErrorModal";
import { Fragment, useState } from "react";
import instance from "../../../../axios";
import htmlTextConverter from "./htmlTextConverter";
import StatusTable from "./StatusTable";
import Progress from "./Progress";
import FullScreenDialog from "./FullDialog";

const isEmpty = (text) => {
  return text === "";
};
const SendEmail = () => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loginResponse, setLoginResponse] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [statusData, setStatusData] = useState({});
  const dataCtx = useData();

  // const handleResponse = (response) => {};
  // const { signOut, loaded } = useGoogleLogout({
  //   scope: "https://mail.google.com/",
  //   clientId: process.env.REACT_APP_CLIENT_ID,
  //   cookiePolicy: "single_host_origin",
  //   onSuccess: { handleResponse },
  // });
  if (!dataCtx.data?.Sheet1) {
    // Error handling
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

  const authorizeUserHandler = async () => {
    const response = await instance({
      method: "GET",
      url: "/authorize",
    }).catch((error) => {
      console.log(error);
    });
    await closeErrorModalHandler();
    //  confirming the email
    // console.log(response);
    // try {
    //   if (response) {
    //     dataCtx.showError({
    //       hasError: true,
    //       errorTitle: "Confirm your email",
    //       errorMessage: `You are sending your mail from ${response.profileObj.email}`,
    //     });
    //     setSenderEmail(response.profileObj.email);
    //     setLoginResponse(response);
    //   }
    // } catch (error) {
    //   dataCtx.showError({
    //     hasError: true,
    //     errorTitle: "Error",
    //     errorMessage:
    //       "Sorry, could't process the request due to some inconvenience",
    //   });
    // }
    // signOut();
  };
  const closeErrorModalHandler = async () => {
    // send email on pressing confirm
    try {
      //sending email
      const data = dataCtx.data.Sheet1?.slice(1).filter(
        //emails to be avoided
        (recipient) =>
          !dataCtx.neglectEmails.includes(
            recipient[0][dataCtx.fields.primaryKey]
          )
      );

      await sendEmailHandler(data); // sending email
      dataCtx.showError({ hasError: false });
    } catch (error) {}
  };

  const sendRequestToBackend = async (data, statData) => {
    //sending request to backend
    const response = await instance({
      method: "POST",
      url: "/sendmessage",
      data: {
        // _: encodeURIComponent(loginResponse.accessToken),
        messages: data,
        subject: dataCtx.subject,
        // from: senderEmail,
        from: "emmanueldavid1320@gmail.com",
      },
    }).catch((error) => {
      console.log(error);
    });
    // statData = { ...statData, ...response.data.status };
    setStatusData((prevStatus) => {
      return { ...prevStatus, ...response.data.status };
    });
    return statData;
  };

  const divideAndSend = async (statData, mailData) => {
    const keys = Object.keys(statData);

    for (let i = 0; i < Math.floor(mailData.length / 5); i++) {
      // sending the email 5 per batch
      statData = await sendRequestToBackend(
        mailData.slice(i * 5, (i + 1) * 5),
        statData
      );
    }
    if (Math.floor(mailData.length / 5) * 5 !== mailData.length) {
      statData = await sendRequestToBackend(
        mailData.slice(
          Math.floor(mailData.length / 5) * 5,
          mailData.length,
          statData
        )
      );
    }

    const unsentMailKeyArray = [];
    for (let j = 0; j < keys.length; j++) {
      if (statData)
        if (!statData[keys[j]]?.status) {
          unsentMailKeyArray.push(keys[j]);
        }
    }
    if (!unsentMailKeyArray.length) {
      setStatus("success");
      return;
    }
    setError(true);
    setStatus("failure");
  };

  const sendEmailHandler = async (data) => {
    setDialogOpen(true);
    setStatus("sending");
    let statData = {}; //since state update takes time
    let mailData = data.map((recipient) => {
      //mail data contains the address and the message to be sent to that address
      const html = htmlTextConverter(dataCtx, recipient);
      const to = recipient[0][dataCtx.fields.emailIdField];
      const id = recipient[0][dataCtx.fields.primaryKey];
      statData[id] = { email: to, status: false };
      return {
        id,
        html,
        to,
      };
    });
    setStatusData((prevStatus) => {
      return { ...prevStatus, ...statData };
    });
    // if (!loginResponse.error) {
    await divideAndSend(statData, mailData);
    // }
    // setTimeout(async () => {
    //   const errRes = await instance({
    //     method: "GET",
    //     url: "/error-mail",
    //   });
    //   let statData = {};
    //   const errorEmails = errRes.data.errorEmails;
    //   if (
    //     errRes.data.errorText.includes("Can't create new access token for user")
    //   ) {
    //     setError(true);
    //     setStatus("failure");
    //     return;
    //   }
    //   errorEmails.forEach((e) => {
    //     statData[e.id] = { email: e.emailOptions.to, status: false };
    //   });
    //   if (!errorEmails.length) {
    //     let flag = true;
    //     const keys = Object.keys(statData);
    //     for (let i = 0; i < keys.length; i++) {
    //       if (!statData[keys[i]].status) {
    //         flag = false;
    //         break;
    //       }
    //     }
    //     if (flag) {
    //       setStatus("success");
    //       return;
    //     } else setStatus("failure");
    //   }
    //   setStatusData((prevStatus) => {
    //     return { ...prevStatus, ...statData };
    //   });
    //   statData = { ...statusData, ...statData };
    //   await sendAgainHandler(statData);
    // }, [Math.floor(mailData.length / 4) * 1000]);
  };

  const sendAgainHandler = async () => {
    const keys = Object.keys(statusData);
    setStatus("sending");
    let unsentMailKeyArray = [];
    for (let i = 0; i < keys.length; i++) {
      if (!statusData[keys[i]].status) {
        unsentMailKeyArray.push(+keys[i]);
      }
    }
    const data = dataCtx.data.Sheet1?.slice(1).filter((recipient) => {
      return unsentMailKeyArray.includes(
        recipient[0][dataCtx.fields.primaryKey]
      );
    });
    await sendEmailHandler(data);
  };
  const sendAgainButtonHandler = async () => {
    await sendAgainHandler();
  };
  const closeFullDialogHandler = () => {
    setDialogOpen(false);
    setTimeout(() => {
      setStatus("");
    }, [1000]);
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
        {/* {!loaded ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <CircularProgress />
            <span style={{ marginLeft: "10px" }}>Please wait</span>
          </div>
        ) : (
          <Button>
            <GoogleLogin
              icon=""
              className={classes.sendEmailButton}
              scope="https://mail.google.com/"
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Send email"
              cookiePolicy={"single-host-orgin"}
              onSuccess={authorizeUserHandler}
            />
          </Button>
        )} */}
        <Button onClick={authorizeUserHandler}>Send Email</Button>
      </div>

      <FullScreenDialog open={dialogOpen} handleClose={closeFullDialogHandler}>
        <div className={classes.progress}>
          <Progress statusData={statusData} status={status} />
        </div>

        {error ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            {/* {!loaded ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <CircularProgress />
                <span style={{ marginLeft: "10px" }}>Please wait</span>
              </div>
            ) : ( */}
            <Fragment>
              (Access token error) Better try again with a different email Id or
              click and try sending to the failed recipients &nbsp;
              <Button
                onClick={sendAgainButtonHandler}
                style={{ textTransform: "lower-case", boxShadow: "" }}
              >
                Send Again
              </Button>
            </Fragment>
            {/* )} */}
          </div>
        ) : (
          ""
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3em",
          }}
        >
          <StatusTable statusData={statusData} status={status} />
        </div>
      </FullScreenDialog>
    </Fragment>
  );
};

export default SendEmail;
