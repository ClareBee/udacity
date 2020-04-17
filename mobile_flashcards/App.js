import "react-native-gesture-handler";

import React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Decks from "./components/Decks";
import Deck from "./components/Deck";
import AddDeck from "./components/AddDeck";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Home = () => TabNavigation();

const TabNavigation = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ _focused, color, size }) => {
        let icon;

        if (route.name === "Decks") {
          icon = <Ionicons name="ios-bookmarks" size={size} color={color} />;
        } else {
          icon = <FontAwesome name="plus-square" size={size} color={color} />;
        }
        return icon;
      },
    })}
    tabBarOptions={{
      activeTintColor: Platform.OS === "ios" ? "blue" : "yellow",
      inactiveTintColor: "gray",
      size: 30,
      style: {
        height: 50,
        backgroundColor: Platform.OS === "ios" ? "yellow" : "blue",
      },
    }}
  >
    <Tab.Screen name="Decks" component={Decks} />
    <Tab.Screen name="AddDeck" component={AddDeck} />
  </Tab.Navigator>
);
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Deck"
          component={Deck}
          options={({ route }) => ({
            title: dateTitle(route.params),
            entryId: route.params,
            headerStyle: {
              backgroundColor: "blue",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
