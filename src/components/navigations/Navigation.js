import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Begin from "../screen/Begin";
import Login from "../screen/Login";
import Register from "../screen/Register";
import Home from "../screen/Home";
import ProductPage from "../screen/ProductPage";
import Details from "../screen/Details";
import Cart from "../screen/Cart";
import Profile from "../screen/Profile";
import EditProfile from "../screen/EditProfile";
import Setting from "../screen/Setting";
import CheckOut from "../screen/CheckOut";
import { useFonts } from "expo-font";
import { useCallback } from "react";

const Stack = createNativeStackNavigator();
function Navigation() {
    const [fontsLoaded] = useFonts({
        black: require("../../../assets/fonts/Inter-Black.ttf"),
        bold: require("../../../assets/fonts/Inter-Bold.ttf"),
        regular: require("../../../assets/fonts/Inter-Regular.ttf"),
        medium: require("../../../assets/fonts/Inter-Medium.ttf"),
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
    <NavigationContainer  onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Begin" component={Begin} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="BottomTab" component={Home} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductPage" component={ProductPage} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="CheckOut" component={CheckOut} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigation;
