import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getData } from "../../features/MyA";
import { useNavigation } from "@react-navigation/native";
const CheckOut = () => {
  const [cartItems, setCartItems] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    retrieveCartItems();
  }, []);

  const retrieveCartItems = async () => {
    try {
      const cartItemsJSON = await getData("cartItems");
      if (cartItemsJSON) {
        const cartItemsArray = JSON.parse(cartItemsJSON);
        setCartItems(cartItemsArray);
      }
    } catch (error) {
      console.error("Error retrieving cart items from AsyncStorage:", error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const userObjectID = await getData("idUser");

      for (const item of cartItems) {
        const checkoutData = {
          idUser: userObjectID,
          TenSanPham: item.item.TenSanPham,
          GiaTien: item.item.GiaTien,
          Size: item.size,
          SoLuong: item.quantity,
          Hinh: item.item.Image,
        };

        const response = await fetch(
          "https://api.backendless.com/BF32422B-2D6B-81ED-FF35-CD7D59024B00/D0672C31-F3A5-4156-BFE7-6439A190F7BA/data/LichSuMuaHang",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(checkoutData),
          }
        );

        if (response.ok) {
          console.log(`Checkout successful!`);
          navigation.navigate("Home");
        } else {
          console.error(
            `Error during checkout for ${item.item.TenSanPham}:`,
            response.status,
            response.statusText
          );
        }
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.product}>
      <Image source={{ uri: item.item.Image }} style={styles.productImage} />
      <View style={styles.detailProduct}>
        <Text style={styles.nameProduct}>{item.item.TenSanPham}</Text>
        <Text>${item.item.GiaTien}</Text>
        <Text>Size: {item.size}</Text>
        <Text>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Checkout</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.item.objectId}-${index}`}
      />
      <TouchableOpacity onPress={handleCheckOut}>
        <Text>Check Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  product: {
    flexDirection: "row",
    marginBottom: 10,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  detailProduct: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  nameProduct: {
    fontWeight: "400",
    fontSize: 15,
  },
});
