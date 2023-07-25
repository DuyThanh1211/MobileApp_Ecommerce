import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { apiApp, apiKey } from "../features/ApiKey";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [women, setWomen] = useState();
  const [men, setMen] = useState();

  const apiUrl = `https://api.backendless.com/${apiApp}/${apiKey}/data/SanPham?pageSize=40`;
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
  const fetchData = async () => {
    try {
      const respone = await fetch(apiUrl);
      const json = await respone.json();
      setData(json);

      const womenItems = json.filter((item) => item.GioiTinh === "Women");
      setWomen(womenItems);

      const menItems = json.filter((item) => item.GioiTinh === "Men");
      setMen(menItems);
    } catch (error) {
      setError(error);
      console.log(setError);
    }
  };

  useEffect(() => {
    getDataAPI();
    fetchData();
  }, []);

  const navigation = useNavigation();

  const navigateToProductDetails = (item) => {
    navigation.navigate("Product Details", { item: item });
  };

  const navigateToProductPage = () => {
    navigation.navigate("List Product", { data: data });
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
      <ScrollView>
        <View>
          <Text>Out product</Text>
          <TouchableOpacity onPress={() => navigateToProductPage(data)}>
            <Text>view all</Text>
          </TouchableOpacity>
          <FlatList
            horizontal={true}
            data={data}
            // numColumns={2}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.objectId}
            style={styles.container}
          />
        </View>

        <View>
          <Text>For women</Text>
          <TouchableOpacity onPress={() => navigateToProductPage(data)}>
            <Text>view all</Text>
          </TouchableOpacity>
          <FlatList
            horizontal={true}
            data={women}
            // numColumns={2}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.objectId}
            style={styles.container}
          />
        </View>
        <View>
          <Text>For men</Text>
          <FlatList
            horizontal={true}
            data={men}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.objectId}
            style={styles.container}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default HomePage;

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
