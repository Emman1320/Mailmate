import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const RedirectToDashboard = () => {
  const history = useHistory();
  useEffect(() => {
    history.replace("/dashboard");
  });
  return <div className=""></div>;
};

export default RedirectToDashboard;
