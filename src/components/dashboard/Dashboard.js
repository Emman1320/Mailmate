import { useSelector } from "react-redux";
// import ProgressBar from "../UI/ProgressBar";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className={classes.dashboard}>
      {/* <div className={classes.progressBarContainer}>
        <ProgressBar>40</ProgressBar>
      </div> */}
      <div className={classes.progressReport}>
        <div className={classes.progressReportList}>
          <div>Hello {user?.email}👋</div>
          <div>Welcome to Mailmate!!</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
