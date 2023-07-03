import { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import TokenContext from "./store/token-context";
import TokenProvider from "./store/TokenProvider";

function App() {
  
  const tokenCtx = useContext(TokenContext);

  if(tokenCtx.isLoggedIn){}
  return (
    <TokenProvider>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
         <Route path="/profile">
            <UserProfile />
          </Route>
        </Switch>
      </Layout>
    </TokenProvider>
  );
}

export default App;
