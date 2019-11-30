import React from "react";
import { Platform, SafeAreaView } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout
} from "react-native-ui-kitten";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import TestApiScreen from "../screens/TestApiScreen";
import PeopleScreen from "../screens/PeopleScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EditContactScreen from "../screens/EditContactScreen";
import TopNavigation from "../components/TopNavigation";

const config = {
  defaultNavigationOptions: props => ({
    header: <TopNavigation {...props} />
  })
};

const TabBarComponent = ({ navigation }) => {
  const onSelect = index => {
    const { [index]: selectedTabRoute } = navigation.state.routes;
    navigation.navigate(selectedTabRoute.routeName);
  };

  return (
    <Layout>
      <SafeAreaView>
        <BottomNavigation
          selectedIndex={navigation.state.index}
          onSelect={onSelect}
        >
          <BottomNavigationTab title="EVENTS" />
          <BottomNavigationTab title="PEOPLE" />
          <BottomNavigationTab title="SETTINGS" />
        </BottomNavigation>
      </SafeAreaView>
    </Layout>
  );
};

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

// HomeStack.navigationOptions = {
//   tabBarLabel: "Home",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === "ios"
//           ? `ios-information-circle${focused ? "" : "-outline"}`
//           : "md-information-circle"
//       }
//     />
//   )
// };
//
// HomeStack.path = "";

const PeopleStack = createStackNavigator(
  {
    People: PeopleScreen,
    EditContact: EditContactScreen
  },
  config
);

// PeopleStack.navigationOptions = {
//   tabBarLabel: "People",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-link" : "md-link"}
//     />
//   )
// };
//
// PeopleStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    TestApi: TestApiScreen
  },
  config
);

// SettingsStack.navigationOptions = {
//   tabBarLabel: "Settings",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-options" : "md-options"}
//     />
//   )
// };
//
// SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    PeopleStack,
    SettingsStack
  },
  {
    tabBarComponent: TabBarComponent
  }
);

tabNavigator.path = "";

export default tabNavigator;
