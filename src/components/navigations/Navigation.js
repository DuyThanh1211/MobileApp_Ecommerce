import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Begin from "../screen/Begin";
import Login from "../screen/Login";
import Register from "../screen/Register";
import Home from "../screen/Home";
import AllProduct from "../screen/AllProduct";
import Details from "../screen/Details";
import Cart from "../screen/Cart";
import Profile from "../screen/Profile";
import EditProfile from "../screen/EditProfile";
import Setting from "../screen/Setting";
import WomenProduct from "../screen/WomenProduct";
import MenProduct from "../screen/MenProduct";
import History from "../screen/History";
import CheckOut from "../screen/CheckOut";
import Lockacc from "../screen/Lockacc";

const Stack = createNativeStackNavigator();
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Begin" component={Begin} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="BottomTab" component={Home} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AllProduct" component={AllProduct} />
        <Stack.Screen name="WomenProduct" component={WomenProduct} />
        <Stack.Screen name="MenProduct" component={MenProduct} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="CheckOut" component={CheckOut} />
        <Stack.Screen name="Lockacc" component={Lockacc} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigation;
