import { FlatList, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

const ProductPage = ({ route }) => {
  const { data } = route.params;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filterData = () => {
      const keyword = searchKeyword.toLowerCase().trim();
      if (keyword === "") {
        setFilteredData(data);
      } else {
        const filtered = data.filter(
          (item) => item.TenSanPham && item.TenSanPham.toLowerCase().includes(keyword)
        );
        setFilteredData(filtered);
      }
    };

    filterData();
  }, [searchKeyword, data]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>{item.TenSanPham}</Text>
        <Text>{item.GiaTien}</Text>
      </View>
    );
  };

  const renderNotFoundMessage = () => {
    if (filteredData.length === 0) {
      return <Text>Không tìm thấy sản phẩm</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => setSearchKeyword(text)}
        value={searchKeyword}
        placeholder="Search..."
      />
      {renderNotFoundMessage()}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.objectId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ProductPage;
