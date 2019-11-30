import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Icon, Layout, Text, Tab, TabView } from "react-native-ui-kitten";
import AuthSignUpTab from "./AuthSignUpTab";
import AuthLoginTab from "./AuthLoginTab";
import TopNavigation from "../components/TopNavigation";

class AuthHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.navigation.getParam("selectedIndex") || 0
    };
  }
  static navigationOptions = props => ({
    header: <TopNavigation {...props} />
  });
  render() {
    return (
      <Layout style={styles.container}>
        <TabView
          selectedIndex={this.state.selectedIndex}
          onSelect={selectedIndex => this.setState({ selectedIndex })}
        >
          <Tab title="Log in">
            <AuthLoginTab navigation={this.props.navigation} />
          </Tab>
          <Tab title="Sign up">
            <AuthSignUpTab navigation={this.props.navigation} />
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
export default AuthHomeScreen;
