import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { apiUrl } from "./ApiLink";

const HomePage = () => {
  const [data, setData] = useState([]);

  const getDataAPI = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  useEffect(() => {
    getDataAPI();
  }, []);

  const navigation = useNavigation();

  const navigateToProductDetails = (item) => {
    navigation.navigate("Product Details", { item: item });
  };

  const renderProductItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          key={item.objectId}
          style={styles.productContainer}
          onPress={() => navigateToProductDetails(item)}
        >
          <Image source={{ uri: item.Image }} style={styles.image} />
          <View style={styles.productNamePrice}>
            <View style={styles.productNameView}>
              <Text style={styles.productName}>{item.TenSanPham}</Text>
            </View>
            <Text style={styles.productDes}>Clothing</Text>
            <View style={styles.productPriceView}>
              <Text style={styles.productPrice}>${item.GiaTien} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.objectId}
        style={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    backgroundColor: "white",
  },
  productContainer: {
    width: "41%",
    margin: 1,
  },
  image: {
    height: 225,
    resizeMode: "cover",
  },
  productNameView: {
    marginTop: 15,
  },
  productName: {
    fontWeight: "600",
  },
  productPriceView: {
    marginBottom: 15,
    marginTop: 5,
  },
  productNamePrice: {
    paddingLeft: 15,
  },
  productPrice: {
    fontWeight: "500",
  },
  productDes: {
    color: "#858585",
  },
});

export default HomePage;
