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
            title="THREADS"
            icon={style => <Icon {...style} name="message-square-outline" />}
          />
          <BottomNavigationTab
            title="PEOPLE"
            icon={style => <Icon {...style} name="people-outline" />}
          />
          <BottomNavigationTab
            title="SETTINGS"
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
  },
  config
);

const PeopleStack = createStackNavigator(
  {
    People: PeopleScreen,
    EditContact: EditContactScreen
  },
  config
);
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    SettingAccount: SettingAccountScreen,
    SettingNotifications: SettingNotificationsScreen,
    TestApi: TestApiScreen
  },
  config
);

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
