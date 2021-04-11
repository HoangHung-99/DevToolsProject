import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import moduleName from '../'

import App from "../pages/App";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Test from "../pages/Test";
import SearchList from "../components/SearchList";
import Detail from "../pages/Detail";

import { history } from '../_helper/history'
import { DashBoard } from "../components/admin/pages/DashBoard";

const RouteComponent = () => {
  return (
    <Router history={history}>
      <Switch>
          <Route exact path='/' component={App}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/detail' component={Detail}/>
          <Route path='/searchlist' component={SearchList}/>
          <Route path='/test' component={Test}/>

          <Route path='/admin' component={DashBoard}/>
      </Switch>
    </Router>
  );
};

export default RouteComponent;
