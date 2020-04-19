### React Navigation v5

npm install @react-navigation/native

#### With Expo

expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

#### With bare React

npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

#### With pods

npx pod-install ios

Steps:

1. Add as 1st line in App.js:
   import 'react-native-gesture-handler';

2. Wrap App

```javascript
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```

3. Install stack navigator:
   npm install @react-navigation/stack
4. Create & configure Stack Navigation:

   ```

   ```

import \* as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() {
return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>Home Screen</Text>
</View>
);
}

const Stack = createStackNavigator();

function DetailsScreen() {
return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>Details Screen</Text>
</View>
);
}
function App() {
return (
<NavigationContainer>
<Stack.Navigator>
<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }}
/>
<Stack.Screen name="Details" component={DetailsScreen} /> </Stack.Navigator>
</NavigationContainer>
);
}

export default App;

```

```

6. use navigation prop to switch screens:
7. import \* as React from 'react';
   import { Button, View, Text } from 'react-native';
   import { NavigationContainer } from '@react-navigation/native';
   import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>Home Screen</Text>
<Button
title="Go to Details"
onPress={() => navigation.navigate('Details')}
/>
</View>
);
}

7. going back
8. function DetailsScreen({ navigation }) {
   return (
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
   <Text>Details Screen</Text>
   <Button
   title="Go to Details... again"
   onPress={() => navigation.push('Details')}
   />
   <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
   <Button title="Go back" onPress={() => navigation.goBack()} />
   </View>
   );
   }

   https://reactnavigation.org/docs/tab-based-navigation
   npm install @react-navigation/bottom-tabs

   https://reactnavigation.org/docs/drawer-based-navigation
