import { Fragment } from "react";
import { useSelector } from "react-redux";
import classes from "./Dashboard.module.css";
import sampleExcelImage from "../../assets/ExcelTestData.jpg";
import stepOneImage from "../../assets/step1.jpg";
import stepTwoImage from "../../assets/step2.jpg";
import stepThreeImage from "../../assets/step3.jpg";
import stepThreeOneImage from "../../assets/step3.1.jpg";
import stepThreeTwoImage from "../../assets/step3.2.jpg";
import stepFourImage from "../../assets/step4.jpg";
import stepFiveImage from "../../assets/step5.jpg";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <Fragment>
      <div className={classes.dashboard}>
        <div className={classes.welcome}>
          <div>Hello {user?.email}👋</div>
          <div>Welcome to Mailmate!!</div>
        </div>
      </div>
      <div>
        <div className={classes.h2}>About</div>
        <div className={classes.para}>
          This is a website to take data from excel files as input and send mass
          emails using it.
        </div>
        <div className={classes.excelImage}>
          <img src={sampleExcelImage} alt="" />
          <div>
            <div className={classes.para}>
              This is the prefered format for the excel file that is uploaded.
            </div>
            <div className={classes.para}>
              <li>
                Every recipient must have an unique key to distinguish from
                other recipients.
              </li>
              <li>Every recipient must have an email Id .</li>
              <li>
                Keep only the table and clear other cells for our application to
                retrieve the information properly.
              </li>
            </div>
          </div>
        </div>
        <div className={classes.h3}>Step 1:</div>
        <div className={classes.para}>
          <img src={stepOneImage} className={classes.img} alt="" />
        </div>
        <div className={classes.h3}>Step 2:</div>
        <div className={classes.para}>
          Deselect the recipients you wanted to exclude.
        </div>
        <img src={stepTwoImage} className={classes.img} alt="" />
        <div className={classes.h3}>Step 3:</div>
        <div className={classes.para}>
          <img src={stepThreeImage} className={classes.img} alt="" />
        </div>
        <div
          className={classes.para}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={stepThreeOneImage}
            className={classes.img}
            style={{ width: "18em" }}
            alt=""
          />
          <div>
            <li>Use the variables for a personalized email.</li>
          </div>
        </div>
        <div
          className={classes.para}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <img
            src={stepThreeTwoImage}
            className={classes.img}
            style={{ width: "28em" }}
            alt=""
          />
          <div>
            <li>Choose the table style you like.</li>
          </div>
        </div>
        <div className={classes.h3}>Step 4:</div>
        <div className={classes.para}>
          Take a look at the preview of your emails.
        </div>
        <img src={stepFourImage} className={classes.img} alt="" />
        <div className={classes.h3}>Step 5:</div>
        <div className={classes.para}>
          Send your emails with a click (If you are using the site for the first
          time then it takes time for that button to respond).
        </div>
        <img src={stepFiveImage} className={classes.img} alt="" />
        <div className={classes.para}>
          A Dialog window opens to choose the account from which you wanted to
          send the emails.
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
