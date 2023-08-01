import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getData } from "../../features/MyA";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { apiApp, apiKey } from "../../features/ApiKey";

const { width, height } = Dimensions.get("screen");

const CheckOut = () => {
  const [isTienMat, setIsTienMat] = useState(false);
  const [isThe, setIsThe] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const navigation = useNavigation();

  const toggleTienMat = () => {
    setIsTienMat(true);
    setIsThe(false);
  };

  const toggleThe = () => {
    setIsThe(true);
    setIsTienMat(false);
  };

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
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TouchableOpacity>
            <AntDesign
              name="left"
              size={25}
              color="black"
              style={styles.backHeader}
            />
          </TouchableOpacity>
          <Text style={styles.textp}> Payment Methods</Text>
        </View>

        <View style={styles.headerItem}>
          <TouchableOpacity onPress={toggleTienMat}>
            {isTienMat ? (
              <AntDesign name="checksquare" size={24} color="black" />
            ) : (
              <AntDesign name="checksquareo" size={24} color="black" />
            )}
          </TouchableOpacity>
          <Text style={styles.TextTT}>Thanh Toán Tiền Mặt</Text>

          <TouchableOpacity onPress={toggleThe}>
            {isThe ? (
              <AntDesign name="checksquare" size={24} color="black" />
            ) : (
              <AntDesign name="checksquareo" size={24} color="black" />
            )}
          </TouchableOpacity>
          <Text style={styles.TextTT}> Thanh Toán Thẻ</Text>
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.item.objectId}-${index}`}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.textto}>
          <Text style={styles.TextTotal}> Total: $2000</Text>
        </View>
        <View style={styles.Buttons}>
          <TouchableOpacity>
            <View style={styles.footerButton}>
              <Text style={styles.TextButton} onPress={handleCheckOut}>
                {" "}
                Check Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: (width * 95) / 100,
    height: (height * 25) / 100,
    alignItems: "center",
    borderBottomWidth: 1,
    backgroundColor: "blue",
  },
  headerTitle: {
    justifyContent: "center",
    marginTop: 20,
    width: 350,
  },
  iconheader: {
    alignItems: "center",
  },
  textp: {
    marginHorizontal: 80,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -25,
  },
  backHeader: {
    marginHorizontal: 10,
  },
  headerItem: {
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
  },
  check: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  TextTT: {
    fontSize: 15,
    fontWeight: "500",
  },

  body: {
    width: (width * 95) / 100,
    height: height,
    marginBottom: 60,
  },
  bodyItem: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  tien: {
    marginTop: 5,
  },
  details: {
    flex: 1,
  },
  bodyItems: {
    flexDirection: "row",
    padding: 5,
  },
  textItem: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textItemgiatien: {
    fontSize: 13,
    fontWeight: "bold",
  },
  textItemsize: {
    fontSize: 11,
    fontWeight: "200",
  },
  textItems: {
    fontSize: 15,
    fontWeight: "bold",
  },
  items: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  item: {
    flex: 1,
    padding: 10,
  },
  img: {
    width: 90,
    height: 120,
  },

  footer: {
    position: "absolute",
    width: width,
    bottom: 0,
    flexDirection: "row",
  },
  footerButton: {
    width: 150,
    height: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  TextButton: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  Buttons: {
    flex: 1,
    alignItems: "flex-end",
  },
  TextTotal: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
  },
  textto: {
    justifyContent: "center",
    paddingLeft: 10,
  },
  containerHeader: {
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
  },
});

export default CheckOut;
