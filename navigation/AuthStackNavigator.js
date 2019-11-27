import React from "react";
import { createStackNavigator } from "react-navigation";

import AuthVerifyScreen from "../screens/AuthVerifyScreen";
import AuthSignUpScreen from "../screens/AuthSignUpScreen";

export default createStackNavigator({
  AuthSignUp: AuthSignUpScreen,
  AuthVerify: AuthVerifyScreen
});
