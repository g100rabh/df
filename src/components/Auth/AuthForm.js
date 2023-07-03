import { useState, useRef, useContext } from "react";
import TokenContext from "../../store/token-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const tokenCtx = useContext(TokenContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const resetForm = () => {
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDef3AFzc3JQQcKXgAwKJmsFGpMRYxuNuM";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDef3AFzc3JQQcKXgAwKJmsFGpMRYxuNuM";
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecuredToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      setIsLoading(false);
      if (res.ok) {
        const data = await res.json();

        tokenCtx.login(data.idToken);

        resetForm();

        console.log(data);
        return data;
      } else {
        const data = await res.json();
        console.log(data);
        // let errorMessage = "Authentication Failed!";
        if (data && data.error && data.error.message) {
          throw new Error("Authentication failed!");
        }
      }
    } catch (error) {
      alert(error.message);
    }

  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create an account"}</button>
          )}
          {isLoading && <p style={{ color: "white" }}>Sending request...</p>}
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
