import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getData, storeData } from "../../features/MyA";

const Details = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigation();

  useEffect(() => {
    getSelectedItem();
  }, []);

  const handleAddToBagCallback = () => {
    navigate.navigate("Cart");
  };

  const getSelectedItem = async () => {
    try {
      const itemJSON = await getData("selectedItem");
      if (itemJSON) {
        const item = JSON.parse(itemJSON);
        setSelectedItem(item);
      }
    } catch (error) {
      console.error("Error retrieving item from AsyncStorage:", error);
    }
  };

  if (!selectedItem) {
    return <Text>Loading...</Text>;
  }

  const checkIfItemExists = (selectedItems, newItem) => {
    for (let i = 0; i < selectedItems.length; i++) {
      const selectedItem = selectedItems[i];
      if (
        selectedItem.item.objectId === newItem.item.objectId &&
        selectedItem.size === newItem.size
      ) {
        return i;
      }
    }
    return -1;
  };

  const handleAddToBag = async () => {
    if (!selectedSize) {
      console.log("Please select a size before adding to bag.");
      return;
    }

    const shoppingBagItem = {
      item: selectedItem,
      size: selectedSize,
      quantity: quantity,
    };

    try {
      const bagItemsJSON = await getData("shoppingBagItems");
      const bagItems = bagItemsJSON ? JSON.parse(bagItemsJSON) : [];

      const existingIndex = checkIfItemExists(bagItems, shoppingBagItem);

      if (existingIndex !== -1) {
        bagItems[existingIndex].quantity += quantity;
      } else {
        bagItems.push(shoppingBagItem);
      }

      await storeData("shoppingBagItems", JSON.stringify(bagItems));
      // console.log("Item added to shopping bag!");
      handleAddToBagCallback();
    } catch (error) {
      console.error("Error adding item to shopping bag:", error);
    }
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          {isFavourite ? (
            <Ionicons name="md-heart-sharp" size={24} color="black" />
          ) : (
            <Ionicons name="md-heart-outline" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: selectedItem.Image }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{selectedItem.TenSanPham}</Text>

        <Text style={styles.productDescription}>{selectedItem.MoTa}</Text>

        <View style={styles.sizeContainer}>
          <Text style={styles.sizeTitle}>Select Size</Text>

          <View style={styles.sizeSelectionContainer}>
            <TouchableOpacity
              style={[
                styles.checkboxContainer,
                selectedSize === "S" && styles.selectedCheckbox,
              ]}
              onPress={() => handleSizeSelection("S")}
            >
              <Text
                style={[
                  styles.checkboxText,
                  selectedSize === "S" && styles.selectedSizeText,
                ]}
              >
                S
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.checkboxContainer,
                selectedSize === "M" && styles.selectedCheckbox,
              ]}
              onPress={() => handleSizeSelection("M")}
            >
              <Text
                style={[
                  styles.checkboxText,
                  selectedSize === "M" && styles.selectedSizeText,
                ]}
              >
                M
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.checkboxContainer,
                selectedSize === "L" && styles.selectedCheckbox,
              ]}
              onPress={() => handleSizeSelection("L")}
            >
              <Text
                style={[
                  styles.checkboxText,
                  selectedSize === "L" && styles.selectedSizeText,
                ]}
              >
                L
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.checkboxContainer,
                selectedSize === "XL" && styles.selectedCheckbox,
              ]}
              onPress={() => handleSizeSelection("XL")}
            >
              <Text
                style={[
                  styles.checkboxText,
                  selectedSize === "XL" && styles.selectedSizeText,
                ]}
              >
                XL
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.quantityContainerView}>
          <Text style={styles.quantityTitle}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
              style={styles.quantityButton}
            >
              <Feather name="minus" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => {
                setQuantity(quantity + 1);
              }}
              style={styles.quantityButton}
            >
              <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceLabel}>Price</Text>
          <Text style={styles.totalPrice}>${selectedItem.GiaTien}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddToBag}>
          <Feather name="shopping-bag" size={24} color="black" />
          <Text style={styles.buttonText}>Add to Bag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    marginVertical: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    zIndex: 999,
  },
  image: {
    height: 600,
    width: "100%",
  },
  detailsContainer: {
    backgroundColor: "black",
    borderRadius: 36,
    paddingHorizontal: 22,
    paddingVertical: 22,
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  productName: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
  productDescription: {
    color: "grey",
  },
  sizeContainer: {
    marginVertical: 22,
  },
  sizeTitle: {
    color: "white",
    marginBottom: 10,
  },
  sizeSelectionContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  checkboxContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    width: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "black",
    marginRight: 12,
  },
  selectedCheckbox: {
    backgroundColor: "white",
  },
  checkboxText: {
    color: "white",
    fontSize: 12,
  },
  selectedSizeText: {
    color: "black",
  },
  quantityTitle: {
    color: "white",
  },
  quantityContainerView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  quantityContainer: {
    marginLeft: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    flex: 1,
  },
  quantityButton: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    color: "white",
    fontSize: 20,
  },
  totalPriceContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  totalPriceLabel: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
    marginRight: 10,
    padding: 5,
  },
  totalPrice: {
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },
  button: {
    marginTop: 12,
    height: 60,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonText: {
    color: "black",
    marginLeft: 12,
  },
});

export default Details;
