import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ProductListCss } from "./ProductListCss";

const AllProduct = ({ route }) => {
  const { data } = route.params;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const navigations = useNavigation();

  const navigateToProductDetails = (item) => {
    navigations.navigate("Details", { item: item });
  };

  useEffect(() => {
    const filterData = () => {
      const keyword = searchKeyword.toLowerCase().trim();
      if (keyword === "") {
        setFilteredData(data);
      } else {
        const filtered = data.filter(
          (item) =>
            item.TenSanPham && item.TenSanPham.toLowerCase().includes(keyword)
        );
        setFilteredData(filtered);
      }
    };

    filterData();
  }, [searchKeyword, data]);

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
          onPress={navigations.goBack}
        >
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <View style={ProductListCss.title}>
          <Text style={ProductListCss.titleText}>All Product</Text>
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

export default AllProduct;
