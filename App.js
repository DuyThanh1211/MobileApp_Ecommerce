// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import Login from "./src/components/Login";
// import Register from "./src/components/Register";
// import ProductPage from "./src/components/ProductPage";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import Profile from "./src/components/navigations/Profile";
// import Profilelogout from "./src/components/navigations/Profilelogout";
// import Home from "./src/components/navigations/Home";
// import EditProfile from "./src/components/navigations/EditProfile";
// import { Profiler } from "react/cjs/react.production.min";
// export default function App() {
//   const Stack = createStackNavigator();
//   return (
//     < EditProfile/>

//     // <>
//     //   <HomePage/>
//     // </>

//     //    <NavigationContainer>
//     //      <Stack.Navigator>
//     //        <Stack.Screen name="List Product" component={ProductPage} />
//     //        <Stack.Screen name="Product Details" component={ProductDetails} />
//     //      </Stack.Navigator>
//     //    </NavigationContainer>
//   );
// }

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Details } from "./src/components/navigations";
import { useCallback } from "react";
import BottomTabNavigation from "./src/components/navigations/BottomTabNavigation";
import ProductPage from "./src/components/screen/ProductPage";
const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    black: require("./assets/fonts/Inter-Black.ttf"),
    bold: require("./assets/fonts/Inter-Bold.ttf"),
    regular: require("./assets/fonts/Inter-Regular.ttf"),
    medium: require("./assets/fonts/Inter-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="List Product" component={ProductPage} />
      </Stack.Navigator>
    </NavigationContainer>
    // <ProductPage />
  );
}
const styles = StyleSheet.create({});
