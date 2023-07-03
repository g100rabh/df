import React, { useState } from "react";

import TokenContext from "./token-context";

const TokenProvider = (props) => {
  const [token, setToken] = useState(null);

  if (token === null && localStorage.length !== 0) {
    setToken(localStorage["user"]);
  }
  console.log(token)

  const userIsLoggedIn = !!token;

  const loginHandler = (tokenId) => {
      setToken(tokenId);
      localStorage.setItem("user", tokenId);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("user")
  };
  
  setTimeout(() => {
    loginHandler();
  }, 5*6000)

  const tokenContext = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  // console.log(tokenContext.token);
  return (
    <TokenContext.Provider value={tokenContext}>
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
