import Button from "../UI/Button";
import classes from "./SignIn.module.css";
import { Link } from "react-router-dom";
import useInput from "../hooks/use-input";
import { useHistory } from "react-router";
import { auth } from "../../firebase";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const SignIn = () => {
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
      .signInWithEmailAndPassword(emailValue, passwordValue)
      .then((res) => {
        if (res) {
          history.push("/dashboard");
        }
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("No user found. Please create an account");
        }
        if (error.code === "auth/wrong-password") {
          alert(error.message);
        }
        return;
      });
    resetEmail();
    resetPassword();
  };
  const signupHandler = () => {
    history.push("/sign-up");
  };
  return (
    <div className={classes.container}>
      <Link to="/dashboard">
        <div className={`${classes.logo} ${classes["margin-top"]}`}>
          <div>Mailmate</div>
        </div>
      </Link>

      <div className={classes.wrapper}>
        <form className={classes.form} onSubmit={submitHandler}>
          <h2>Sign-in</h2>
          <div className={classes.details}>
            <label>
              <h3>Email</h3>
            </label>
            <input
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
              <h3>Sign in</h3>
            </Button>
          </div>
        </form>
        <div className={classes.signup} onClick={signupHandler}>
          <p>Create an account</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
