import { useContext } from 'react';
import { Link } from 'react-router-dom';
import TokenContext from '../../store/token-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  const tokenCtx = useContext(TokenContext);

  const isLoggedIn = tokenCtx.isLoggedIn;

  const logoutClickHandler = (event) => {
    tokenCtx.logout();
    console.log(tokenCtx.token)
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLoggedIn && <li>
            <button onClick={logoutClickHandler}>Logout</button>
          </li>}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
