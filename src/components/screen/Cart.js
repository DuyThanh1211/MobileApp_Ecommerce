import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import BottomTab from "../navigations/BottomTab";

const Cart = ({ route }) => {
  const { cartItems } = route.params ?? {};

  const [items, setItems] = useState([]);

  const TotalQuantity = () => {
    let totalQuantity = 0;
    items.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  const TotalPrice = () => {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.GiaTien * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const increaseQuantity = (index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += 1;
    setItems(updatedItems);
  };

  const decreaseQuantity = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      setItems(updatedItems);
    }
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const removeAllItems = () => {
    setItems([]);
  };

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const updatedItems = [...items];

      cartItems.forEach((item) => {
        const existingItem = updatedItems.find(
          (updatedItem) =>
            updatedItem.objectId === item.objectId &&
            updatedItem.selectedSize === item.selectedSize
        );

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          updatedItems.push({ ...item, quantity: item.quantity });
        }
      });

      setItems(updatedItems);
    }
  }, [cartItems]);

  console.log(items);

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
          <FlatList
            data={items}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.product}>
                <Image
                  source={{ uri: item.Image }}
                  style={styles.productImage}
                />
                <View style={styles.detailProduct}>
                  <Text style={styles.nameProduct}>{item.TenSanPham}</Text>
                  <View style={styles.priceSize}>
                    <Text style={{ fontWeight: "600", fontSize: 20 }}>
                      ${item.GiaTien}
                    </Text>
                    <Text>Size: {item.selectedSize}</Text>
                  </View>

                  <View style={styles.buttonQuantity}>
                    <TouchableOpacity onPress={() => decreaseQuantity(index)}>
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
                    <TouchableOpacity onPress={() => increaseQuantity(index)}>
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
            )}
          />
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
          <TouchableOpacity style={styles.button}>
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
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    paddingTop: 50,
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
