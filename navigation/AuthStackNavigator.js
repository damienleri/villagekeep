import React from "react";
import { createStackNavigator } from "react-navigation";

import AuthVerifyScreen from "../screens/AuthVerifyScreen";
import AuthHomeScreen from "../screens/AuthHomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

export default createStackNavigator({
  Welcome: WelcomeScreen,
  AuthHome: AuthHomeScreen,
  AuthVerify: AuthVerifyScreen
});
