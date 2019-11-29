import React from "react";
import { createStackNavigator } from "react-navigation";

import AuthVerifyScreen from "../screens/AuthVerifyScreen";
import AuthHomeScreen from "../screens/AuthHomeScreen";

export default createStackNavigator({
  AuthHome: AuthHomeScreen,
  AuthVerify: AuthVerifyScreen
});
