import { AsyncStorage, Platform } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

const NOTIFICATION_KEY = "MobileFlashcards:notifications";

export const registerForPushNotifications = async () => {
  // notifications don't show on emulators
  if (Constants.isDevice) {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then((result) => JSON.parse(result))
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync();
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);
              const notificationToSend = createNotification();
              Notifications.scheduleLocalNotificationAsync(notificationToSend, {
                time: tomorrow,
                repeat: "day",
              });

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
        }
      });
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("default", {
      name: "default",
      sound: true,
      priority: "max",
      vibrate: [0, 250, 250, 250],
    });
  }
};

function createNotification() {
  return {
    title: "Take a quiz!",
    body: "👋 Don't forget to learn every day!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}
