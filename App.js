import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductItem from "./src/components/ProductItem";
import Login from "./src/components/Login";
import Register from "./src/components/Register";

export default function App() {
  return (
    <>
     <Login/>
    </>
  );
}

const styles = StyleSheet.create({});
