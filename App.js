import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductItem from "./src/components/ProductItem";

export default function App() {
  return (
    <>
      <ProductItem />
    </>
  );
}

const styles = StyleSheet.create({});
