import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStackNavigator,
      Main: MainTabNavigator,
      AuthLoading: AuthLoadingScreen
    },
    { initialRouteName: "AuthLoading" }
  )
);
