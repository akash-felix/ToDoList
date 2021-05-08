import React ,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {Provider} from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import {loaduser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Edititem from './components/dashboard/Edititem';
const App=()=> {
  useEffect(()=>{
    if(localStorage.token){
      setAuthToken(localStorage.token);
    }
    store.dispatch(loaduser());
  },[]);
return(
  <Provider store={store}> 
  <Router>
    <Fragment>
      
      <Route exact path='/' component={Landing}/>
      <section className="container">
        <Alert/>
        <Switch>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/:id" component={Edititem}/>
          
        </Switch>
      </section>
    </Fragment>
    </Router>
    </Provider>
)
}
export default App;
