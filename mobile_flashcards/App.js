import "react-native-gesture-handler";

import React, { useEffect } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { StyleSheet, Platform, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";

import { registerForPushNotifications } from "./utils/helpers";
import { primaryColour, secondaryColour, lightColour } from "./utils/colours";

import Decks from "./components/Decks";
import Deck from "./components/Deck";
import AddDeck from "./components/AddDeck";
import AddQuestion from "./components/AddQuestion";
import Quiz from "./components/Quiz";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => TabNavigation();

const TabNavigation = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ _focused, color, size }) => {
        let icon;

        if (route.name === "Decks") {
          icon = (
            <MaterialCommunityIcons name="cards" size={size} color={color} />
          );
        } else {
          icon = <FontAwesome name="plus-square" size={size} color={color} />;
        }
        return icon;
      },
    })}
    tabBarOptions={{
      activeTintColor: Platform.OS === "ios" ? primaryColour : lightColour,
      inactiveTintColor: "gray",
      size: 30,
      style: {
        height: 50,
        backgroundColor: Platform.OS === "ios" ? lightColour : primaryColour,
      },
    }}
  >
    <Tab.Screen name="Decks" component={Decks} />
    <Tab.Screen name="AddDeck" component={AddDeck} />
  </Tab.Navigator>
);
function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
export default function App() {
  useEffect(() => {
    //TODO: set local notification
    registerForPushNotifications();
  });

  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <FlashcardStatusBar
        backgroundColor={primaryColour}
        barStyle="light-content"
      />

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Deck"
            component={Deck}
            options={({ route }) => ({
              title: route.params,
              deckId: route.params,
              headerStyle: {
                backgroundColor: primaryColour,
              },
              headerTintColor: lightColour,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            })}
          />
          <Stack.Screen
            name="AddQuestion"
            component={AddQuestion}
            options={({ route }) => ({
              title: "Add Question",
              deckId: route.params,

              headerStyle: {
                backgroundColor: secondaryColour,
              },
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            })}
          />
          <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={() => ({
              title: "Quiz",
              headerStyle: {
                backgroundColor: secondaryColour,
              },
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
