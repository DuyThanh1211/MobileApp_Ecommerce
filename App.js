import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Login from "./src/components/Login";
import Register from "./src/components/Register";
import ProductPage from "./src/components/ProductPage";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetails from "./src/components/ProductDetails";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./src/components/HomePage";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Register} />
        <Stack.Screen name="Product Details" component={ProductDetails} />
        <Stack.Screen name="List Product" component={ProductPage} />
      </Stack.Navigator>
    </NavigationContainer>

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
