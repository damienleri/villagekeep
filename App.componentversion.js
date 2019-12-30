import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  mapping,
  light as lightTheme,
  dark as darkTheme
} from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import Amplify from "@aws-amplify/core";
import {
  AppearanceProvider,
  Appearance,
  useColorScheme
} from "react-native-appearance";

import awsConfig from "./aws-exports";

import AppNavigator from "./navigation/AppNavigator";

Amplify.configure(awsConfig);
const colorScheme = Appearance.getColorScheme();

// export default function App(props) {
export default class App extends React.Component {
  state = { colorScheme, isLoadingComplete: false };
  //
  // setGlobal = (name, value) => {
  //   this.setState({ [name]: value });
  // };
  render() {
    // const [isLoadingComplete, setLoadingComplete] = useState(false);
    const { isLoadingComplete } = this.state;

    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    } else {
      return (
        <React.Fragment>
          <AppearanceProvider>
            <ApplicationProvider
              mapping={mapping}
              theme={colorScheme === "dark" ? darkTheme : lightTheme}
            >
              <View style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <AppNavigator theme={colorScheme} />
              </View>
            </ApplicationProvider>
          </AppearanceProvider>
        </React.Fragment>
      );
    }
  }
}
async function loadResourcesAsync() {}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
