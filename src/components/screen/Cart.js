import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import BottomTab from "../navigations/BottomTab";
import { getData, storeData, removeData } from "../../features/MyA";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   getCartItems();
  //   setLoading(true);
  // }, []);

  useEffect(() => {
    if (isFocused) {
      refreshCartItems();
    }
    setLoading(true);
  }, [isFocused]);

  const refreshCartItems = async () => {
    try {
      const cartItemsJSON = await getData("shoppingBagItems");
      if (cartItemsJSON) {
        const cartItemsArray = JSON.parse(cartItemsJSON);
        setCartItems(cartItemsArray);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving cart items from AsyncStorage:", error);
    }
  };

  const updateCartItemsInAsyncStorage = async (cartItems) => {
    try {
      const cartItemsJSON = JSON.stringify(cartItems);
      await storeData("shoppingBagItems", cartItemsJSON);
      setLoading(false);
    } catch (error) {
      console.error("Error updating cart items in AsyncStorage:", error);
    }
  };

  // const getCartItems = async () => {
  //   try {
  //     const cartItemsJSON = await getData("shoppingBagItems");
  //     if (cartItemsJSON) {
  //       const cartItemsArray = JSON.parse(cartItemsJSON);
  //       setCartItems(cartItemsArray);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Error retrieving cart items from AsyncStorage:", error);
  //   }
  // };

  const renderCartItem = ({ item, index }) => {
    const navigateToDetails = async () => {
      try {
        await storeData("selectedItem", JSON.stringify(item.item));
        navigation.navigate("Details");
      } catch (error) {
        console.error("Error storing selected product:", error);
      }
    };
    const increaseQuantity = () => {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity += 1;
      setCartItems(updatedCartItems);
      updateCartItemsInAsyncStorage(updatedCartItems);
    };

    const decreaseQuantity = () => {
      const updatedCartItems = [...cartItems];
      if (updatedCartItems[index].quantity > 1) {
        updatedCartItems[index].quantity -= 1;
        setCartItems(updatedCartItems);
        updateCartItemsInAsyncStorage(updatedCartItems);
      }
    };

    const removeItem = () => {
      Alert.alert("Xác nhận xoá", "Bạn có chắc chắn muốn xoá sản phẩm này?", [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xoá",
          onPress: () => {
            const updatedCartItems = [...cartItems];
            updatedCartItems.splice(index, 1);
            setCartItems(updatedCartItems);
            updateCartItemsInAsyncStorage(updatedCartItems);
          },
        },
      ]);
    };

    return (
      <View style={styles.product}>
        <TouchableWithoutFeedback onPress={navigateToDetails}>
          <Image
            source={{ uri: item.item.Image }}
            style={styles.productImage}
          />
        </TouchableWithoutFeedback>
        <View style={styles.detailProduct}>
          <TouchableOpacity onPress={navigateToDetails}>
            <Text style={styles.nameProduct}>{item.item.TenSanPham}</Text>
          </TouchableOpacity>
          <View style={styles.priceSize}>
            <Text style={{ fontWeight: "600", fontSize: 20 }}>
              ${item.item.GiaTien}
            </Text>
            <Text>Size: {item.size}</Text>
          </View>

          <View style={styles.buttonQuantity}>
            <TouchableOpacity onPress={() => decreaseQuantity()}>
              <Ionicons name="remove" size={14} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              {item.quantity}
            </Text>
            <TouchableOpacity onPress={() => increaseQuantity()}>
              <Ionicons name="add" size={14} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.remove}
            onPress={() => removeItem(index)}
          >
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const TotalQuantity = () => {
    let totalQuantity = 0;
    cartItems.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  const TotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.item.GiaTien * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const removeAllItems = () => {
    if (cartItems.length === 0) {
      Alert.alert("Thông báo", "Chưa có sản phẩm trong giỏ hàng.");
    } else {
      Alert.alert(
        "Xác nhận xoá",
        "Bạn có chắc chắn muốn xoá tất cả sản phẩm trong giỏ hàng?",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Xoá",
            onPress: () => {
              setCartItems([]);
              updateCartItemsInAsyncStorage([]);
            },
          },
        ]
      );
    }
  };

  const handleCheckOut = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Thông báo", "Chưa có sản phẩm trong giỏ hàng.");
      return;
    }

    try {
      await storeData("checkoutItems", JSON.stringify(cartItems));

      navigation.navigate("CheckOut");
    } catch (error) {
      console.error("Error storing cart items in AsyncStorage:", error);
    }
  };

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
    <>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>My Cart</Text>
        </View>
        <TouchableOpacity style={styles.removeButton}>
          <Text style={{ color: "white" }} onPress={removeAllItems}>
            Remove All
          </Text>
        </TouchableOpacity>
        <View style={styles.productView}>
          {cartItems.length === 0 ? (
            <Text style={styles.emptyCartMessage}>Your cart is empty.</Text>
          ) : (
            <FlatList
              data={cartItems}
              renderItem={renderCartItem}
              keyExtractor={(item, index) => `${item.item.objectId}-${index}`}
            />
          )}
        </View>

        <View style={styles.total}>
          <View style={styles.quantity}>
            <Text style={styles.quantityText}>Quantity</Text>
            <Text style={styles.quantityNum}>{TotalQuantity()}</Text>
          </View>
          <View style={styles.quantity}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalNum}>${TotalPrice()}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              cartItems.length === 0 && styles.disabledButton,
            ]}
            onPress={handleCheckOut}
          >
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
        <BottomTab />
      </View>
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: "gray",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    paddingTop: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  product: {
    alignSelf: "center",
    marginTop: 10,
    width: 330,
    height: 140,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
  },
  total: {
    position: "absolute",
    bottom: 0,
    // backgroundColor: "yellow",
    width: "100%",
    height: 210,
    paddingTop: 10,
    backgroundColor: "black",
  },
  quantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    alignSelf: "center",
    height: 50,
    width: 330,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 5,
  },
  totalText: {
    fontWeight: "700",
    fontSize: 20,
    color: "white",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "400",
    color: "black",
  },
  totalNum: {
    fontWeight: "700",
    fontSize: 20,
    color: "green",
  },
  quantityText: {
    color: "grey",
    fontSize: 12,
  },
  quantityNum: {
    color: "grey",
    fontSize: 12,
  },
  productView: {
    marginBottom: 320,
  },
  detailProduct: {
    flex: 1,
    padding: 10,
    // backgroundColor: "red",
  },
  remove: {},
  productImage: {
    width: 90,

    borderRadius: 8,
  },
  buttonQuantity: {
    alignItems: "center",
    padding: 2,
    width: 80,
    justifyContent: "center",
    // backgroundColor: "red",
    borderWidth: 1,
    // borderRadius: 10,
    flexDirection: "row",
  },
  nameProduct: {
    fontWeight: "400",
    fontSize: 15,
  },
  priceSize: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  removeButton: {
    alignItems: "center",
    width: 100,
    paddingTop: 5,
    marginLeft: 10,
  },
});
