import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Icon, Layout, Text, Tab, TabView } from "react-native-ui-kitten";
import AuthSignUpTab from "./AuthSignUpTab";
import Form from "../components/Form";
import TopNavigation from "../components/TopNavigation";

export default class AuthHomeScreen extends React.Component {
  state = {
    selectedIndex: 0
  };
  static navigationOptions = {
    header: <TopNavigation />
    // header: null
  };
  componentDidMount() {
    this.setState({
      selectedIndex: 1
    });
  }
  render() {
    return (
      <Layout style={styles.container}>
        <TabView
          selectedIndex={this.state.selectedIndex}
          onSelect={selectedIndex => this.setState({ selectedIndex })}
        >
          <Tab title="Log in"></Tab>
          <Tab title="Sign up">
            <AuthSignUpTab />
          </Tab>
        </TabView>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
