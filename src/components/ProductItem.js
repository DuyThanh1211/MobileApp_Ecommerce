import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ProductList from "../features/getAPI/getProduct";

const ProductItem = () => {
  return (
    <ScrollView style={styles.container}
    data={data}
    renderItem>
      <ProductList />
    </ScrollView>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {},
});
  