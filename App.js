import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Login from "./src/components/Login";
import Register from "./src/components/Register";
import ProductPage from "./src/components/ProductPage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "./src/components/navigations/Profile";
import Profilelogout from "./src/components/navigations/Profilelogout";
import Home from "./src/components/navigations/Home";
import EditProfile from "./src/components/navigations/EditProfile";
import { Profiler } from "react/cjs/react.production.min";
export default function App() {
  const Stack = createStackNavigator();
  return (
    < EditProfile/>

    // <>
    //   <HomePage/>
    // </>

    //    <NavigationContainer>
    //      <Stack.Navigator>
    //        <Stack.Screen name="List Product" component={ProductPage} />
    //        <Stack.Screen name="Product Details" component={ProductDetails} />
    //      </Stack.Navigator>
    //    </NavigationContainer>
  );
}


const styles = StyleSheet.create({})
