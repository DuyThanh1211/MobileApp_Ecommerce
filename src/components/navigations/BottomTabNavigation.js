import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { Favourite, Home, Profile, Search } from "../navigations";

const Tab = createBottomTabNavigator();

const screenOptions={
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle:{
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: COLORS.white
    }
}
const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
           name="Home"
           component={Home}
           options={{
            tabBarIcon: ({ focused })=>{
                return (
                    <MaterialCommunityIcons
                      name={focused ? "home" : "home-outline"}
                      size={24}
                      color={COLORS.black}
                    />
                )
            }
           }}
        />
       
<Tab.Screen
           name="Favourite"
           component={Favourite}
           options={{
            tabBarIcon: ({ focused })=>{
                return (
                    <Ionicons
                      name={focused ? "book" : "book-outline"}
                      size={24}
                      color={COLORS.black}
                    />
                )
            }
           }}
        />

<Tab.Screen
           name="Profile"
           component={Profile}
           options={{
            tabBarIcon: ({ focused })=>{
                return (
                    <Ionicons
                      name={focused ? "person" : "person-outline"}
                      size={24}
                      color={COLORS.black}
                    />
                )
            }
           }}
        />
    </Tab.Navigator>
  )
}

export default BottomTabNavigation