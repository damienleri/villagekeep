import React from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import {
  Icon,
  Layout,
  Text,
  Radio,
  Card,
  CardHeader,
  List,
  ListItem,
  Spinner
} from "@ui-kitten/components";
import Button from "./Button";
import { colors } from "../utils/style";

const AddIcon = style => <Icon {...style} name="star" />;

const AddEventActions = ({ user, appearance, handleAddEvent }) => {
  return (
    <View style={styles.addEventActions}>
      <Button
        appearance={appearance}
        onPress={() => handleAddEvent({ type: "family", user })}
      >
        Add event
      </Button>
    </View>
  );

  // return (
  //   <View style={styles.addEventActions}>
  //     {user.isParent ? (
  //       <AddEventButton
  //         appearance={appearance}
  //         onPress={() => handleAddEvent({ type: "family", user })}
  //       >
  //         Add Family event
  //       </AddEventButton>
  //     ) : (
  //       <React.Fragment>
  //         <AddEventButton
  //           appearance={appearance}
  //           onPress={() => handleAddEvent({ type: "friends", user })}
  //         >
  //           Add Friend event
  //         </AddEventButton>
  //         <AddEventButton
  //           appearance={appearance}
  //           onPress={() => handleAddEvent({ type: "family", user })}
  //         >
  //           Add Family event
  //         </AddEventButton>
  //       </React.Fragment>
  //     )}
  //   </View>
  // );
};
export default AddEventActions;

const styles = StyleSheet.create({
  addEventActions: {
    marginVertical: 10
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between"
  }
});
