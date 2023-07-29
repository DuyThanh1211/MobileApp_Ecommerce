import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Begin from '../screen/Begin';
import Login from '../screen/Login';
import Register from '../screen/Register';
import Home from '../screen/Home';
import ProductPage from '../screen/ProductPage';
import Details from '../screen/Details';
import Cart from '../screen/Cart';
import Profile from '../screen/Profile';
import EditProfile from '../screen/EditProfile';
import BottomTab from './BottomTab'

const Stack = createNativeStackNavigator();
function Navigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            
          {/* <Stack.Screen name="Begin" component={Begin} />
          <Stack.Screen name="Login" component={Login} /> */}
          {/* <Stack.Screen name="Register" component={Register} /> */}
          <Stack.Screen name="BottomTab" component={Home} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ProductPage" component={ProductPage} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
export default Navigation;