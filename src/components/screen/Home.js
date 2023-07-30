import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, images, SIZES, FONTS } from "../constants";
import { Feather } from "@expo/vector-icons";
import { latestList, shoesList1, shoesList2 } from "../constants/data";
import { apiKey, apiApp } from "../../features/ApiKey";
import BottomTab from "../navigations/BottomTab";

const styles = StyleSheet.create({
  container: {
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 58,
    height: 22,
  },
  sectionContainer: {
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    marginTop: SIZES.padding,
    width: SIZES.width - 44,
    height: SIZES.height - 200,
  },
  sectionTextContainer: {
    marginHorizontal: 12,
    marginVertical: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.h3,
  },
  sectionDescription: {
    ...FONTS.body4,
    marginVertical: 10,
  },
  productListContainer: {
    marginBottom: 50,
  },
  productListTitle: {
    ...FONTS.h3,
    marginVertical: SIZES.padding * 2,
  },
  viewAllButton: {
    // Style your "View All" button here
  },
  productItemContainer: {
    marginRight: SIZES.padding,
  },
  productImage: {
    height: 140,
    width: 140,
  },
  productName: {
    // Style your product name here
  },
  productCategory: {
    // Style your product category here
  },
  productPrice: {
    fontSize: 12,
    marginVertical: 4,
  },
  bottomTab: {
    // Style your BottomTab component here
  },
});

const Home = ({ navigation }) => {
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
      const response = await fetch(apiUrl);
      const json = await response.json();
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

  const navigateToProductDetails = (item) => {
    navigation.navigate("Details", { item: item });
  };

  const navigateToProductPage = () => {
    navigation.navigate("List Product", { data: data });
  };

  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.productItemContainer}>
        <TouchableOpacity key={item.objectId} onPress={() => navigateToProductDetails(item)}>
          <Image source={{ uri: item.Image }} style={styles.productImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToProductDetails(item)}>
          <Text style={styles.productName}>{item.TenSanPham}</Text>
        </TouchableOpacity>

        <Text style={styles.productCategory}>Clothing</Text>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.productPrice}>${item.GiaTien}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={images.logo} resizeMode="contain" style={styles.logo} />
      </View>

      <ScrollView>
        <View style={styles.sectionContainer}>
          <FlatList
            horizontal
            data={shoesList1}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Image
                source={item.shoes}
                resizeMode="contain"
                style={{
                  width: SIZES.width - 44,
                  height: SIZES.height - 200,
                }}
              />
            )}
          />

          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Made for Miles</Text>
            <Text style={styles.sectionDescription}>
              The perfect place to find your new favorite running shoes
            </Text>
          </View>
        </View>

        <View style={styles.productListContainer}>
          <Text style={styles.productListTitle}>Our Product</Text>
          <TouchableOpacity onPress={navigateToProductPage}>
            <Text>View All</Text>
          </TouchableOpacity>
          <FlatList
            horizontal
            data={data.slice(0, 5)}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.objectId}
          />
        </View>

        <View style={styles.productListContainer}>
          <Text style={styles.productListTitle}>For Men</Text>
          <FlatList
            horizontal
            data={men}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.objectId}
          />
        </View>

        <View style={styles.productListContainer}>
          <Text style={styles.productListTitle}>For Women</Text>
          <FlatList
            horizontal
            data={women}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.objectId}
          />
        </View>
      </ScrollView>

      <BottomTab />
    </View>
  );
};

export default Home;
