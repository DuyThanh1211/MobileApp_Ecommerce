import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ProductDetails = ({ route }) => {
  const { product } = route.params;
  return (
    <View>
      <Image source={{ uri: product.Image }} style={styles.image} />
      <Text>{product.TenSanPham}</Text>
      <Text>{product.GiaTien}</Text>
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
