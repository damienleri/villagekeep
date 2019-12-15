import React from "react";
import { Platform, SafeAreaView } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Icon
} from "@ui-kitten/components";

import HomeScreen from "../screens/HomeScreen";
import TestApiScreen from "../screens/TestApiScreen";
import PeopleScreen from "../screens/PeopleScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EditContactScreen from "../screens/EditContactScreen";
// import EditEventScreen from "../screens/EditEventScreen";
import EventScreen from "../screens/EventScreen";
import EditEventPhonesScreen from "../screens/EditEventPhonesScreen";
import SettingAccountScreen from "../screens/SettingAccountScreen";
import SettingNotificationsScreen from "../screens/SettingNotificationsScreen";
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
          <BottomNavigationTab
            // title="EVENTS"
            icon={style => <Icon {...style} name="message-square-outline" />}
          />
          <BottomNavigationTab
            // title="PEOPLE"
            icon={style => <Icon {...style} name="people-outline" />}
          />
          <BottomNavigationTab
            // title="SETTINGS"
            icon={style => <Icon {...style} name="settings-outline" />}
          />
        </BottomNavigation>
      </SafeAreaView>
    </Layout>
  );
};

const EventsStack = createStackNavigator(
  {
    Home: HomeScreen,
    Event: EventScreen,
    EditEventPhones: EditEventPhonesScreen
    // EditEvent: EditEventScreen
  },
  config
);

// EventsStack.navigationOptions = {
//   tabBarLabel: "Events",
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
// EventsStack.path = "";

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
    SettingAccount: SettingAccountScreen,
    SettingNotifications: SettingNotificationsScreen,
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
    EventsStack,
    PeopleStack,
    SettingsStack
  },
  {
    tabBarComponent: TabBarComponent
  }
);

tabNavigator.path = "";

export default tabNavigator;
