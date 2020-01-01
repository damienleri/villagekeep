import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Icon, Layout, Text } from "@ui-kitten/components";
import AuthHomeScreen from "./AuthHomeScreen";
import { gutterWidth } from "../utils/style";
import BuildInfo from "../components/BuildInfo";
import Button from "../components/Button";

export default class WelcomeScreen extends React.Component {
  state = {};
  static navigationOptions = {
    header: null
  };
  componentDidMount() {}
  render() {
    return (
      <Layout style={styles.container}>
        <SafeAreaView>
          <Text category="h5" style={styles.header}>
            It takes a village to raise a kid.
          </Text>
          <Text style={styles.subHeader}>
            Now keep the village in your pocket!
          </Text>

          <Text style={styles.introText}>
            This contacts and messaging app connects the families of teenage
            friends so that everyone can be in the loop.
          </Text>
          <Button
            onPress={() =>
              this.props.navigation.navigate("AuthHome", { selectedIndex: 1 })
            }
          >
            Sign up
          </Button>
          <Button
            appearance="outline"
            style={styles.loginButton}
            onPress={() =>
              this.props.navigation.navigate("AuthHome", { selectedIndex: 0 })
            }
          >
            Log in
          </Button>
        </SafeAreaView>

        <BuildInfo />
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 30, paddingHorizontal: gutterWidth },
  header: { marginTop: 50, fontWeight: "normal", textAlign: "center" },
  introText: {
    marginVertical: 24,
    fontSize: 18,
    lineHeight: 22
  },
  loginButton: { marginTop: 20 },
  subHeader: {
    marginTop: 10,
    marginBottom: 10,
    fontStyle: "italic",
    textAlign: "center"
  }
});
