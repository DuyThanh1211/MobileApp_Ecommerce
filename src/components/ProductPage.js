import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ProductList from "../features/ProductList";
const ProductPage = () => {
  return (
    <>
      <ProductList />
    </>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
