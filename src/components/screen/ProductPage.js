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

const ProductPage = ({ route }) => {
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
        style={styles.item}
        onPress={() => navigateToProductDetails(item)}
      >
        <View>
          <Image source={{ uri: item.Image }} style={styles.image} />
        </View>
        <View>
          <Text style={styles.productName}>{item.TenSanPham}</Text>
        </View>
        <View>
          <Text style={styles.productDes}>Clothing</Text>
        </View>
        <View style={styles.productPriceView}>
          <Text style={styles.productPrice}>${item.GiaTien}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNotFoundMessage = () => {
    if (filteredData.length === 0) {
      return (
        <Text style={{ marginTop: 20, alignSelf: "center", fontSize: 20 }}>
          Không tìm thấy sản phẩm
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Icon name="search" size={20} color="white" style={styles.searchIcon} />
        <TextInput
          onChangeText={(text) => setSearchKeyword(text)}
          value={searchKeyword}
          placeholder="Search..."
          placeholderTextColor="white"
          style={styles.text}
        />
      </View>
      {renderNotFoundMessage()}
      <FlatList
        data={filteredData}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.objectId}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 225,
  },
  item: {
    width: 160,
    margin: 4.5,
  },
  productName: {
    fontWeight: "600",
  },
  productDes: {
    color: "grey",
    fontSize: 12,
  },
  productPrice: {
    fontWeight: "500",
  },
  productPriceView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  search: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "black",
  },
  text: {
    color: "white",
  },
  searchIcon: {
    padding: 5,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
});

export default ProductPage;
