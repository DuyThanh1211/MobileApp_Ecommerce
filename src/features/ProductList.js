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

const ProductList = ({ data, searchQuery }) => {
  const navigations = useNavigation();
  const [filteredData, setFilteredData] = useState([]);

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
    const formattedQuery = searchQuery.toLowerCase();
    const filteredData = data.filter((item) =>
      item.TenSanPham.toLowerCase().includes(formattedQuery)
    );
    setFilteredData(filteredData);
    getDataAPI();
  }, [data, searchQuery]);

  const navigation = useNavigation();

  const navigateToProductDetails = (item) => {
    navigation.navigate("Product Details", { item: item });
  };

  const navigateToHomePage = (item) => {
    navigation.navigate("HomePage", { item: item });
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
         data={filteredData}
        numColumns={2}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.objectId}
        style={styles.container}
      />
    </>
  );
};

export default ProductList;

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
