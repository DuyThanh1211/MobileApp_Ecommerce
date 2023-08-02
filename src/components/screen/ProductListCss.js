import { StyleSheet } from "react-native";

export const ProductListCss = StyleSheet.create({
  topNavigation: {
    flexDirection: "row",
    alignItems: "center",
    height: 90,
    backgroundColor: "black",
  },
  back: {
    marginLeft: 15,
  },
  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 45,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "700",
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  listContainer: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 225,
    borderRadius: 10,
  },
  item: {
    width: 160,
    margin: 15,
  },
  productName: {
    fontWeight: "600",
    color: "white",
  },
  productDes: {
    color: "grey",
    fontSize: 12,
  },
  productPrice: {
    fontWeight: "500",
    color: "white",
  },
  productPriceView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  search: {
    padding: 10,
    marginTop: 0,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "white",
  },
  text: {
    color: "black",
  },
  searchIcon: {
    padding: 5,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
});
