import "react-native-gesture-handler";

import React from "react";
import { Platform, StatusBar, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import AddEntry from "./components/AddEntry";
import EntryDetail from "./components/EntryDetail";
import History from "./components/History";
import Live from "./components/Live";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { white, purple } from "./utils/colours";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function UdacityStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Home = () => TabNavigation();

const dateTitle = (routeParams) => {
  const { entryId } = routeParams;
  const year = entryId.slice(0, 4);
  const month = entryId.slice(5, 7);
  const day = entryId.slice(8);
  return `${month}/${day}/${year}`;
};

const TabNavigation = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ _focused, color, size }) => {
        let icon;

        if (route.name === "History") {
          icon = <Ionicons name="ios-bookmarks" size={size} color={color} />;
        } else if (route.name === "AddEntry") {
          icon = <FontAwesome name="plus-square" size={size} color={color} />;
        } else {
          icon = <Ionicons name="ios-speedometer" size={size} color={color} />;
        }
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
    <Tab.Screen name="Live" component={Live} />
  </Tab.Navigator>
);
export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <UdacityStatusBar backgroundColor={purple} barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="EntryDetail"
            component={EntryDetail}
            options={({ route }) => ({
              title: dateTitle(route.params),
              entryId: route.params,
              headerStyle: {
                backgroundColor: purple,
              },
              headerTintColor: white,
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
