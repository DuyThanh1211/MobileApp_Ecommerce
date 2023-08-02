import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getData } from "../../features/MyA";
import { apiApp, apiKey } from "../../features/ApiKey";

const History = () => {
  const navigation = useNavigation();
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPurchaseHistory();
    inUserID();
    setLoading(true);
  }, []);

  const inUserID = async () => {
    try {
      const idUser = await getData("idUser");
      setLoggedInUser(idUser);
    } catch (error) {
      console.error("Error inUserID:", error);
      throw error;
    }
  };

  const fetchPurchaseHistory = async () => {
    try {
      const response = await fetch(
        `https://api.backendless.com/${apiApp}/${apiKey}/data/LichSuMuaHang?pageSize=40`
      );
      if (response.ok) {
        const data = await response.json();
        setPurchaseHistory(data);
        setLoading(false);
      } else {
        console.error(
          "Failed to fetch purchase history:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching purchase history:", error);
    }
  };

  const renderItem = ({ item }) => {
    const isSameUser = loggedInUser && item.idUser === loggedInUser;

    const formatTotal = item.GiaTien * item.SoLuong;
    const formatedTotal = formatTotal.toFixed(2);
    const createdDate = new Date(item.created);
    const formattedDate = `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;
    console.log(item.created);
    if (isSameUser) {
      return (
        <View style={styles.product}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.Hinh }} style={styles.image} />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.nameProduct} numberOfLines={1}>
              {item.TenSanPham}
            </Text>
            <View style={styles.infoContainer}>
              <View>
                <Text style={styles.price}>${item.GiaTien}</Text>
                <Text>Size: {item.Size}</Text>
                <Text>Ngày đặt: {formattedDate}</Text>
              </View>
              <Text>{item.NgayMua}</Text>
            </View>
            <View style={styles.priceQuantity}>
              <Text style={styles.total}>Total: ${formatedTotal}</Text>
              <Text>x{item.SoLuong}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  if (Loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <ActivityIndicator size={"large"} color="white"></ActivityIndicator>
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
      <View style={styles.topTitle}>
        <TouchableOpacity style={styles.back} onPress={navigation.goBack}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}> Purchase History</Text>
      </View>
      <FlatList
        data={purchaseHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.objectId}
        style={styles.productContainer}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  back: {
    position: "absolute",
    left: 15,
    bottom: 12,
  },

  imageContainer: {
    padding: 5,
  },

  image: {
    width: 90,
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
    color: "white",
  },
  topTitle: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "black",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 15,
  },

  productContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  product: {
    width: "90%",
    backgroundColor: "white",
    marginTop: 20,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    padding: 12,
    // backgroundColor: "red",
  },
  priceQuantity: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  nameProduct: {
    fontSize: 15,
  },
  infoContainer: {
    justifyContent: "space-between",
    marginTop: 13,
    flexDirection: "row",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    paddingBottom: 7,
    borderColor: "#d5d5d5",
  },
  price: {
    fontSize: 20,
    fontWeight: "500",
  },
  total: {
    fontSize: 20,
    fontWeight: "600",
  },
});
