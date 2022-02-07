import { useHistory } from "react-router";
import Button from "../UI/Button";
import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";
import useInput from "../hooks/use-input";
import { auth } from "../../firebase";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const SignUp = () => {
  const history = useHistory();

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }
  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    auth
      .createUserWithEmailAndPassword(emailValue, passwordValue)
      .then((res) => {
        if (res) {
          history.push("/dashboard");
        }
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("No user found. Please create an account");
        } else {
          alert(error.message);
        }
        return;
      });
    // resetUserName();
    resetEmail();
    resetPassword();
  };
  const signinHandler = () => {
    history.push("/sign-in");
  };
  return (
    <div className={classes.container}>
      <Link to="/dashboard">
        <div className={`${classes.logo} ${classes["margin-top"]}`}>
          <div>Mailmate</div>
        </div>
      </Link>

      <div className={`${classes.wrapper} ${classes.shrink}`}>
        <form className={classes.form} onSubmit={submitHandler}>
          <h2>Sign-up</h2>
          <div className={classes.details}>
            <label>
              <h3>Email</h3>
            </label>
            <input
              spellCheck="false"
              type="text"
              className={emailHasError ? classes.invalid : ""}
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailHasError && (
              <p className={classes["error-text"]}>
                Please enter a valid email address.
              </p>
            )}

            <label>
              <h3>Password</h3>
            </label>
            <input
              spellCheck="false"
              type="password"
              className={passwordHasError ? classes.invalid : ""}
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && (
              <p className={classes["error-text"]}>
                Please enter a valid password
              </p>
            )}
          </div>
          <div className={classes.actions}>
            <Button disabled={!formIsValid}>
              <h3>Sign up</h3>
            </Button>
          </div>
        </form>
        <div className={classes.signin} onClick={signinHandler}>
          <p>Already have an account ? Sign in here</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
