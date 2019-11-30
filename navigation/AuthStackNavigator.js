import React from "react";
import { createStackNavigator } from "react-navigation";

import AuthHomeScreen from "../screens/AuthHomeScreen"; // includes signup and login tabs
import AuthVerifyScreen from "../screens/AuthVerifyScreen";
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
    AuthEditAccount: AuthEditAccountScreen
  },
  config
);
