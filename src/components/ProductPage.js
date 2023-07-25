import { FlatList, ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import ProductList from "../features/ProductList";
import { apiUrl } from "../features/ApiLink";
const ProductPage = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [originalData, setOriginalData] = useState([]);

  const getDataAPI = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        // setOriginalData(data);
        // console.log(originalData)
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  useEffect(() => {
    getDataAPI();
  }, []);

  // const handleSeach = (searchTerm) => {
  //   setSearchQuery(searchTerm);
  //   const formattedQuery = searchTerm.toLowerCase();
  //   const filteredData = originalData.filter((item) =>
  //     item.TenSanPham.toLowerCase().includes(formattedQuery)
  //   );
  //   setData(filteredData);
  // };
  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };
  // const handleClearSearch = () => {
  //   setSearchQuery('');
  //   setData(originalData);
  // };
  const handleClearSearch = () => {
    setSearchQuery('');
  };
  return (
    <>
    <View>
      <TextInput
      clearButtonMode='always'
      autoCapitalize='none'
      placeholder="Search"
      autoCorrect={false}
      value={searchQuery}
      onChangeText={handleSearch}
      onEndEditing={() => {
        if (!searchQuery) {
          handleClearSearch();
        }
      }}
     />
    </View>
      <ProductList  data={data} searchQuery={searchQuery}/>
    </>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
  