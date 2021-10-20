import { useEffect } from 'react';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth';
import { authenticate_user } from './actions/auth';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? <Component {...props} /> : <Redirect to="/auth" />;
      }}
    />
  );
};

function App() {

  const dispatch = useDispatch();
  const auth = useSelector((state)=>state.auth);

  useEffect(() => {

    let profile = localStorage.getItem('profile');
    if (profile) {
      dispatch(authenticate_user(JSON.parse(profile)));
    }

  }, [dispatch]);

  return (
    <BrowserRouter>

      <Navbar />
      <Switch>
        <Route path="/auth" exact component={Auth}/>
        <PrivateRoute component={Home} isLoggedin={auth.isLoggedin} path="/" exact />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
