import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import FrogetPassword from "./screens/FrogetPassword";
import ResetPassword from "./screens/ResetPassword";
import LicenseScreen from "./screens/LicenseScreen";
import AddLicense from "./screens/AddLicense";
import LicenseEditScreen from "./screens/LicenseEditScreen";
import UsersScreen from "./screens/UsersScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";

import { useDispatch, useSelector } from "react-redux";
import { listLicenses } from "./Redux/Actions/LicenseActions";


function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listLicenses());
     
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/licenses" component={LicenseScreen} />
          <PrivateRouter path="/addlicense" component={AddLicense} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter
            path="/license/:id/edit"
            component={LicenseEditScreen}
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterScreen} />
          <PrivateRouter path="/profile" component={ProfileScreen} />
          <Route path="/forgotPassword" component={FrogetPassword} />
          <Route path="/passwordreset/:id/:token" component={ResetPassword} />
          
          <PrivateRouter path="*" component={NotFound} />

        </Switch>
      </Router>
    </>
  );
}

export default App;
