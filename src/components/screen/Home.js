import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { apiKey, apiApp } from "../../features/ApiKey";
import BottomTab from "../navigations/BottomTab";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import { apiUrl } from "../../features/apiURL";
import { storeData } from "../../features/MyA";

const Home = () => {
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [women, setWomen] = useState([]);
  const [men, setMen] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const dataItemsJSON = JSON.stringify(json);
      storeData("dataItems", dataItemsJSON);

      const womenItems = json.filter((item) => item.GioiTinh === "Women");
      setWomen(womenItems);
      const womenItemsJSON = JSON.stringify(womenItems);
      storeData("womenItems", womenItemsJSON);

      const menItems = json.filter((item) => item.GioiTinh === "Men");
      setMen(menItems);
      const menItemsJSON = JSON.stringify(menItems);
      storeData("menItems", menItemsJSON);

      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(setError);
    }
  };

  useEffect(() => {
    getDataAPI();
    fetchData();
    setLoading(true);
  }, []);

  const navigateToProductDetails = async (item) => {
    try {
      await AsyncStorage.setItem("selectedItem", JSON.stringify(item));
    } catch (error) {
      console.error("Error saving item to AsyncStorage:", error);
    }

    navigation.navigate("Details");
  };

  const navigateToAllProduct = () => {
    navigation.navigate("AllProduct");
  };

  const navigateToMenProduct = () => {
    navigation.navigate("MenProduct");
  };
  const navigateToWomenProduct = () => {
    navigation.navigate("WomenProduct");
  };

  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.productItemContainer}>
        <TouchableOpacity
          key={item.objectId}
          onPress={() => navigateToProductDetails(item)}
        >
          <Image source={{ uri: item.Image }} style={styles.productImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToProductDetails(item)}>
          <Text style={styles.productName}>{item.TenSanPham}</Text>
        </TouchableOpacity>

        <Text style={styles.productCategory}>Clothing</Text>

        <View style={styles.productPriceView}>
          <Text style={styles.productPrice}>${item.GiaTien}</Text>
        </View>
      </View>
    );
  };

  const saleList = [
    {
      id: "1",
      sale: "https://images.squarespace-cdn.com/content/v1/55e467b1e4b0a2a709a23aa9/e9274d45-d26c-4d87-b75b-6f15d5654a4d/NikeUltimateSale",
    },
    {
      id: "2",
      sale: "https://cdn.greatdeals.com.sg/wp-content/uploads/2020/05/30093330/nike-flash-sale-628x921.jpg",
    },
    {
      id: "3",
      sale: "https://sneakersteal.com/wp-content/uploads/2022/08/image-40-768x1024.png",
    },
    {
      id: "4",
      sale: "https://pbs.twimg.com/media/EFZ1looXsAAFzHZ.jpg",
    },
  ];

  if (Loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="black"></ActivityIndicator>
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> Lỗi Tải Dữ Liệu, Hãy Kiểm Tra Lại Đuờng Truyền</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Home</Text>
      </View>

      <ScrollView>
        <View style={styles.sectionContainer}>
          <View style={styles.section}>
            <FlatList
              data={saleList}
              horizontal={true}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <Image
                  source={{ uri: item.sale }}
                  style={{
                    flex: 1,
                    width: width - 60,
                    borderRadius: 10,
                  }}
                />
              )}
              pagingEnabled={true}
            />
          </View>
        </View>

        <View style={styles.productListContainer}>
          <View style={styles.productListName}>
            <Text style={styles.productListTitle}>Our Product</Text>
            <TouchableOpacity onPress={navigateToAllProduct}>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={data.slice(0, 5)}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.objectId}
            style={styles.containerItem}
          />
        </View>

        <View style={styles.productListContainer}>
          <View style={styles.productListName}>
            <Text style={styles.productListTitle}>For Men</Text>
            <TouchableOpacity onPress={navigateToMenProduct}>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={men.slice(0, 5)}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.objectId}
            style={styles.containerItem}
          />
        </View>

        <View style={styles.productListContainer}>
          <View style={styles.productListName}>
            <Text style={styles.productListTitle}>For Women</Text>
            <TouchableOpacity onPress={navigateToWomenProduct}>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={women.slice(0, 5)}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.objectId}
            style={styles.containerItem}
          />
        </View>
      </ScrollView>

      <BottomTab />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  logoContainer: {
    justifyContent: "flex-end",
    padding: 5,
    alignItems: "center",
    height: 60,
    backgroundColor: "black",
  },
  logo: {
    fontSize: 20,
    fontWeight: "700",
    paddingBottom: 10,
    color: "white",
  },
  productListName: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  sectionContainer: {
    margin: 30,
  },
  section: {
    width: "100%",
    height: 550,
  },
  sectionTextContainer: {
    padding: 10,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  sectionDescription: {},
  productListContainer: {
    marginBottom: 50,
  },
  productListTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  viewAllButton: {
    color: "white",
  },
  containerItem: {
    margin: 2,
  },
  productItemContainer: {
    // backgroundColor: "#666666",
    width: 150,
    margin: 5,
    borderRadius: 10,
    // borderWidth: 1,
    // backgroundColor: "green",
  },
  productImage: {
    margin: 10,
    alignSelf: "center",
    width: "80%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },

  productName: {
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: "700",
    color: "white",
  },
  productCategory: {
    color: "white",
    paddingLeft: 10,
  },
  productPrice: {
    color: "white",
    paddingLeft: 10,
    fontWeight: "800",
  },
  productPriceView: {},
  bottomTab: {},
});
