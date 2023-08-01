import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ProductListCss } from "./ProductListCss";
import { getData } from "../../features/MyA";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WomenProduct = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();

  const fetchWomenItems = async () => {
    const women = await getData("womenItems");
    const womenItems = JSON.parse(women);
    return womenItems;
  };

  const navigateToProductDetails = async (item) => {
    try {
      await AsyncStorage.setItem("selectedItem", JSON.stringify(item));
    } catch (error) {
      console.error("Error saving item to AsyncStorage:", error);
    }

    navigation.navigate("Details");
  };

  useEffect(() => {
    const filterData = async () => {
      const womenItems = await fetchWomenItems();
      const keyword = searchKeyword.toLowerCase().trim();
      if (keyword === "") {
        setFilteredData(womenItems);
      } else {
        const filtered = womenItems.filter(
          (item) =>
            item.TenSanPham && item.TenSanPham.toLowerCase().includes(keyword)
        );
        setFilteredData(filtered);
      }
    };

    filterData();
  }, [searchKeyword]);

  useEffect(() => {
    fetchWomenItems();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={ProductListCss.item}
        onPress={() => navigateToProductDetails(item)}
      >
        <View>
          <Image source={{ uri: item.Image }} style={ProductListCss.image} />
        </View>
        <View>
          <Text style={ProductListCss.productName}>{item.TenSanPham}</Text>
        </View>
        <View>
          <Text style={ProductListCss.productDes}>Clothing</Text>
        </View>
        <View style={ProductListCss.productPriceView}>
          <Text style={ProductListCss.productPrice}>${item.GiaTien}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNotFoundMessage = () => {
    if (filteredData.length === 0) {
      return (
        <Text
          style={{
            marginTop: 20,
            alignSelf: "center",
            fontSize: 20,
            color: "white",
          }}
        >
          Không tìm thấy sản phẩm
        </Text>
      );
    }
    return null;
  };
  return (
    <>
      <View style={ProductListCss.topNavigation}>
        <TouchableOpacity
          style={ProductListCss.back}
          onPress={navigation.goBack}
        >
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <View style={ProductListCss.title}>
          <Text style={ProductListCss.titleText}>Women Product</Text>
        </View>
      </View>
      <View style={ProductListCss.container}>
        <View style={ProductListCss.search}>
          <Icon
            name="search"
            size={20}
            color="black"
            style={ProductListCss.searchIcon}
          />
          <TextInput
            onChangeText={(text) => setSearchKeyword(text)}
            value={searchKeyword}
            placeholder="Search..."
            placeholderTextColor="black"
            style={ProductListCss.text}
          />
        </View>
        {renderNotFoundMessage()}
        <FlatList
          data={filteredData}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.objectId}
          contentContainerStyle={ProductListCss.listContainer}
        />
      </View>
    </>
  );
};

export default WomenProduct;
