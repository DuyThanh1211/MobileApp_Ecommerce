import { FlatList, ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

const ProductPage = ({ route }) => {
  const { data } = route.params;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>{item.TenSanPham}</Text>
        <Text>{item.GiaTien}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.objectId}
        />
      </View>
    </>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
  