import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ProductDetails = ({ route }) => {
  const { item } = route.params;
  return (
    <View>
      <Image source={{ uri: item.Image }} style={styles.image} />
      <Text>{item.TenSanPham}</Text>
      <Text>{item.MoTa}</Text>
      <Text>{item.GiaTien}</Text>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 225,
    resizeMode: "center",
  },
});
