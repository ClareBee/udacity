import "react-native-gesture-handler";

import React from "react";
import { Platform, StatusBar, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { white, purple } from "./utils/colours";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

const Tab = createBottomTabNavigator();

function UdacityStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <UdacityStatusBar backgroundColor={purple} barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ _focused, color, size }) => {
              let icon;

              if (route.name === "History") {
                icon = (
                  <Ionicons name="ios-bookmarks" size={size} color={color} />
                );
              } else if (route.name === "AddEntry") {
                icon = (
                  <FontAwesome name="plus-square" size={size} color={color} />
                );
              }

              // You can return any component that you like here!
              return icon;
            },
          })}
          tabBarOptions={{
            activeTintColor: Platform.OS === "ios" ? purple : white,
            inactiveTintColor: "gray",
            size: 30,
            style: {
              height: 50,
              backgroundColor: Platform.OS === "ios" ? white : purple,
            },
          }}
        >
          <Tab.Screen name="History" component={History} />
          <Tab.Screen name="AddEntry" component={AddEntry} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
