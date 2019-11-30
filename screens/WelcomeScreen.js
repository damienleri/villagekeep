import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Icon, Layout, Text, Button } from "react-native-ui-kitten";
import AuthHomeScreen from "./AuthHomeScreen";
import { gutterWidth } from "../utils/style";

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
          <Text category="h4" style={styles.header}>
            It takes a village to raise a kid.
          </Text>
          <Text category="h6" style={styles.subHeader}>
            Now keep the village in your pocket!
          </Text>

          <Button
            onPress={() =>
              this.props.navigation.navigate("AuthHome", { selectedIndex: 1 })
            }
          >
            Sign up
          </Button>
          <Button
            appearance="ghost"
            onPress={() =>
              this.props.navigation.navigate("AuthHome", { selectedIndex: 0 })
            }
          >
            Log in
          </Button>
        </SafeAreaView>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 30, paddingHorizontal: gutterWidth },
  header: { marginTop: 50, fontWeight: "normal", textAlign: "center" },
  subHeader: {
    marginTop: 10,
    marginBottom: 80,
    fontStyle: "italic",
    textAlign: "center"
  }
});
