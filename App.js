import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductPage from "./src/components/ProductPage";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetails from "./src/components/ProductDetails";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./src/components/HomePage";

const Stack = createStackNavigator();

export default function App() {
  return (
    // <>
    //   <ProductDetails />
    // </>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List Product" component={ProductPage} />
        <Stack.Screen name="Product Details" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
