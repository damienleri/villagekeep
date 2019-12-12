import React, { useState } from "react";
import { AppLoading } from "expo";
import { connect } from "react-redux";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Platform, StatusBar, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  mapping,
  light as lightTheme,
  dark as darkTheme
} from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { Provider } from "react-redux";
import Amplify from "@aws-amplify/core";
import { AppearanceProvider, Appearance } from "react-native-appearance";
import { PersistGate } from "redux-persist/integration/react";

import awsConfig from "./aws-exports";
import { setSettings } from "./redux/actions";
import { NetworkProvider } from "./components/NetworkProvider";

import { store, persistor } from "./redux/store";
console.log(!!store, !!persistor);
import AppNavigator from "./navigation/AppNavigator";

Amplify.configure(awsConfig);

function AppContents(props) {
  const { settings = {} } = props;
  const { theme } = settings;
  return (
    <AppearanceProvider>
      <IconRegistry icons={EvaIconsPack} />
      <NetworkProvider>
        <ApplicationProvider
          mapping={mapping}
          theme={theme === "dark" ? darkTheme : lightTheme}
        >
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </ApplicationProvider>
      </NetworkProvider>
    </AppearanceProvider>
  );
}

const mapStateToProps = ({ settings }) => {
  return { settings };
};

const ConnectedAppContents = connect(mapStateToProps)(AppContents);
function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedAppContents />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
async function loadResourcesAsync() {}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
