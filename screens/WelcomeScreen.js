import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Icon, Layout, Text, Button } from "react-native-ui-kitten";
import AuthHomeScreen from "./AuthHomeScreen";

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
            It takes a village
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
  container: { flex: 1, paddingVertical: 30, paddingHorizontal: 32 },
  header: { marginTop: 50, marginBottom: 30 }
});
