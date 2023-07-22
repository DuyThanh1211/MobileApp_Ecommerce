import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductItem from "./src/components/ProductItem";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetails from "./src/components/ProductDetails";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

export default function App() {
  return (
    // <>
    //   <ProductItem />
    // </>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List Product" component={ProductItem} />
        <Stack.Screen name="Product Details" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
