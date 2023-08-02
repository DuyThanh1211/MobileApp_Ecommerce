import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getData, removeData, storeData } from "../../features/MyA";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { apiApp, apiKey } from "../../features/ApiKey";

import { useIsFocused } from "@react-navigation/native";

const CheckOut = () => {
  const [isCast, setIsCast] = useState(true);
  const [isCard, setIsCard] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [text, onChangeText] = React.useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigation();
  const [Loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const toggleCast = () => {
    setIsCast(true);
    setIsCard(false);
  };

  const toggleCard = () => {
    setIsCard(true);
    setIsCast(false);
  };

  const retrieveAddress = async () => {
    try {
      const storedAddress = await getData("address");
      onChangeText(storedAddress || "");
    } catch (error) {
      console.error("Error retrieving address from AsyncStorage:", error);
    }
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.item.GiaTien * item.quantity;
    }, 0);
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    if (isFocused) {
      retrieveCartItems();
    }
  }, [isFocused]);

  const retrieveCartItems = async () => {
    try {
      console.log("Retrieving cart items from AsyncStorage...");
      const cartItemsJSON = await getData("checkoutItems");
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
      const paymentMethod = isCast ? "cash" : "card";
      const address = text;

      for (const item of cartItems) {
        const checkoutData = {
          idUser: userObjectID,
          TenSanPham: item.item.TenSanPham,
          GiaTien: item.item.GiaTien,
          Size: item.size,
          SoLuong: item.quantity,
          Hinh: item.item.Image,
          PhuongThucThanhToan: paymentMethod,
          DiaChi: address,
        };

        const response = await fetch(
          `https://api.backendless.com/${apiApp}/${apiKey}/data/LichSuMuaHang?pageSize=40`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(checkoutData),
          }
        );

        if (!response.ok) {
          console.error(
            `Error during checkout for ${item.item.TenSanPham}:`,
            response.status,
            response.statusText
          );
          return;
        }
      }

      console.log("Checkout successful!");
      await removeData("shoppingBagItems");
      Alert.alert("Thanh toán thành công", "Bạn đã thanh toán thành công", [
        {
          text: "Đồng ý",
          onPress: () => {
            setCartItems([]);
            navigation.navigate("Home");
          },
        },
      ]);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.product}>
      <Image source={{ uri: item.item.Image }} style={styles.productImage} />
      <View style={styles.detailProduct}>
        <Text style={styles.nameProduct}>{item.item.TenSanPham}</Text>
        <Text style={styles.priceProduct}>${item.item.GiaTien}</Text>
        <Text style={styles.sizeProduct}>Size: {item.size}</Text>
        <Text style={styles.quantityProduct}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  useEffect(() => {
    retrieveCartItems();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  useEffect(() => {
    retrieveAddress();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backHeader} onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Payment Methods</Text>
      </View>

      <View style={styles.payment}>
        <View style={styles.paymentCheckBox}>
          <TouchableOpacity onPress={toggleCast}>
            {isCast ? (
              <AntDesign name="checksquare" size={24} color="white" />
            ) : (
              <AntDesign name="checksquareo" size={24} color="white" />
            )}
          </TouchableOpacity>
          <Text style={styles.textPay}>Thanh Toán Tiền Mặt</Text>
        </View>

        <View style={styles.paymentCheckBox}>
          <TouchableOpacity onPress={toggleCard}>
            {isCard ? (
              <AntDesign name="checksquare" size={24} color="white" />
            ) : (
              <AntDesign name="checksquareo" size={24} color="white" />
            )}
          </TouchableOpacity>
          <Text style={styles.textPay}>Thanh Toán Thẻ</Text>
        </View>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Address..."
        placeholderTextColor={"white"}
      />

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.item.objectId}-${index}`}
      />

      <View style={styles.footer}>
        <Text style={styles.textTotal}> Total: ${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.textButton} onPress={handleCheckOut}>
            Pay now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  backHeader: {
    position: "absolute",
    left: 10,
    bottom: 8,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  payment: {
    flexDirection: "row",
    paddingVertical: 17,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  paymentCheckBox: {
    flexDirection: "row",
  },
  textPay: {
    color: "white",
    marginLeft: 5,
    alignSelf: "center",
  },
  input: {
    padding: 10,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: "white",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
    color: "white",
  },

  product: {
    padding: 10,
    flexDirection: "row",
  },

  productImage: {
    width: 100,
    height: 130,
    borderRadius: 10,
  },
  detailProduct: {
    padding: 20,
  },
  footer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameProduct: {
    color: "white",
  },
  priceProduct: {
    color: "white",
  },
  sizeProduct: {
    color: "white",
  },
  quantityProduct: {
    color: "white",
  },
  textTotal: {
    alignSelf: "center",
    paddingLeft: 15,
    fontSize: 18,
    fontWeight: "700",
  },
  footerButton: {
    backgroundColor: "green",
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  textButton: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
});

export default CheckOut;
