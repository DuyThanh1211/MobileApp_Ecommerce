import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getData } from "../../features/MyA";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { apiApp, apiKey } from "../../features/ApiKey";

const CheckOut = () => {
  const [isTienMat, setIsTienMat] = useState(true);
  const [isThe, setIsThe] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [text, onChangeText] = React.useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigation();

  const toggleTienMat = () => {
    setIsTienMat(true);
    setIsThe(false);
  };

  const toggleThe = () => {
    setIsThe(true);
    setIsTienMat(false);
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
          `https://api.backendless.com/${apiApp}/${apiKey}/data/LichSuMuaHang`,
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
          <TouchableOpacity onPress={toggleTienMat}>
            {isTienMat ? (
              <AntDesign name="checksquare" size={24} color="white" />
            ) : (
              <AntDesign name="checksquareo" size={24} color="white" />
            )}
          </TouchableOpacity>
          <Text style={styles.textPay}>Thanh Toán Tiền Mặt</Text>
        </View>

        <View style={styles.paymentCheckBox}>
          <TouchableOpacity onPress={toggleThe}>
            {isThe ? (
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
    paddingTop: 50,
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
