import React from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import {
  Icon,
  Layout,
  Text,
  Button,
  Radio,
  Card,
  CardHeader,
  List,
  ListItem,
  Spinner
} from "react-native-ui-kitten";
const AddIcon = style => <Icon {...style} name="star" />;
const AddEventButton = props => (
  <Button
    {...props}
    appearance={props.appearance}
    size="small"
    style={[props.style, styles.addEventButton]}
    textStyle={styles.addEventButtonText}
  >
    {props.children}
  </Button>
);

const AddEventActions = ({ user, appearance, handleAddEvent }) => {
  return (
    <View style={styles.addEventActions}>
      <AddEventButton
        appearance={appearance}
        onPress={() => handleAddEvent({ type: "family", user })}
      >
        Add event
      </AddEventButton>
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
  },
  addEventButton: { marginVertical: 10 },
  addEventButtonText: { textTransform: "uppercase" }
});
