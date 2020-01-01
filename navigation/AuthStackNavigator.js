import React from "react";
import { createStackNavigator } from "react-navigation";

import AuthHomeScreen from "../screens/AuthHomeScreen"; // includes signup and login tabs
import AuthVerifyScreen from "../screens/AuthVerifyScreen";
import AuthForgotPasswordScreen from "../screens/AuthForgotPasswordScreen";
import AuthForgotPasswordVerifyScreen from "../screens/AuthForgotPasswordVerifyScreen";
import AuthEditAccountScreen from "../screens/AuthEditAccountScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import TopNavigation from "../components/TopNavigation";

const config = {
  defaultNavigationOptions: props => ({
    header: <TopNavigation {...props} />
  })
};

export default createStackNavigator(
  {
    Welcome: WelcomeScreen,
    AuthHome: AuthHomeScreen,
    AuthVerify: AuthVerifyScreen,
    AuthForgotPassword: AuthForgotPasswordScreen,
    AuthForgotPasswordVerify: AuthForgotPasswordVerifyScreen,
    AuthEditAccount: AuthEditAccountScreen
  },
  config
);
