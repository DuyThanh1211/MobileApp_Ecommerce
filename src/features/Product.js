import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Product = ({ tenSanPham, image, moTa, giaTien }) => {
  return (
    <View style={styles.container}>
      <Text>{tenSanPham}</Text>
      <Image
        source={{ uri: image }}
        style={{ width: 100, height: 100, backgroundColor: "red" }}
      />
      <Text>{moTa}</Text>
      <Text>{giaTien}</Text>

      <TouchableOpacity>
        <Text>Mua ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
