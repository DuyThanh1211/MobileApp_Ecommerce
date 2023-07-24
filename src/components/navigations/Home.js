import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, images, SIZES, FONTS } from '../constants'
import { Feather } from "@expo/vector-icons"
import { latestList, shoesList1, shoesList2 } from '../constants/data'

const Home = ({ navigation }) => {
  return (
   <SafeAreaView style={{
    flex: 1,
    backgroundColor: COLORS.white
   }}>
     <View style={{
        marginHorizontal: 22,
        marginTop: 12
     }}>
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={{
                width: 58,
                height: 22
              }}
            />

            <View>
                <View style={{
                    position: "absolute",
                    bottom: 16,
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: COLORS.black,
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 999
                }}>
                    <Text style={{
                        fontSize: 10,
                        color: COLORS.white
                    }}>8</Text>
                </View>
                <Feather
                  name="shopping-bag"
                  size={24}
                  color={COLORS.black}
                />
            </View>
        </View> 

        <ScrollView>
            <View  style={{
            backgroundColor: COLORS.gray,
            borderRadius: 20,
            marginTop: SIZES.padding,
            width: SIZES.width - 44
          }}>

           
            <FlatList
              horizontal={true}
              data={shoesList1}
              keyExtractor={item=>item.id}
              renderItem={
                ({ item, index })=> (
                    <Image
                      source={item.shoes}
                      resizeMode="contain"
                    />
                )
              }
            />

            <FlatList
              horizontal={true}
              data={shoesList2}
              keyExtractor={item=>item.id}
              renderItem={
                ({ item, index })=> (
                    <Image
                      source={item.shoes}
                      resizeMode="contain"
                    />
                )
              }
            />

            <View style={{
                marginHorizontal: 12,
                marginVertical: SIZES.padding
            }}>
                <Text style={{...FONTS.h3}}>Made for Miles</Text>
                <Text style={{...FONTS.body4, marginVertical: 10}}>
                    The perfect place to find your new favourite running shoes
                </Text>
            </View>
            </View>

            <View style={{
                marginBottom: 120
            }}>
                <Text style={{
                    ...FONTS.h3,
                    marginVertical: SIZES.padding *2
                }}>The Latest and Greatest</Text>

                <FlatList
                  horizontal={true}
                  data={latestList}
                  keyExtractor={item=>item.id}
                  renderItem={
                    ({ item, index })=>(
                        <View style={{
                            marginRight: SIZES.padding
                        }}>
                            <TouchableOpacity
                             onPress={()=>navigation.navigate("Details")}
                            >
                                <Image
                                 source={item.image}
                                 style={{
                                    height: 140,
                                    width: 140
                                 }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={()=>navigation.navigate("Details")}
                            >
                                <Text style={{
                                    fontSize: 14,
                                    color: COLORS.black,
                                    fontWeight: "bold"
                                }}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 10,
                                color: COLORS.black
                            }}>
                                {item.category}
                            </Text>

                            <View style={{
                                flexDirection: "row"
                            }}>
                                {
                                    item.oldPrice !== item.price && (
                                        <Text style={{
                                            fontSize: 12,
                                            marginVertical: 4,
                                            marginRight: 6,
                                            textDecorationColor: COLORS.black,
                                            textDecorationLine: "line-through"
                                        }}>
                                            ${item.oldPrice}
                                        </Text>
                                    )
                                }

                                <Text style={{
                                     fontSize: 12,
                                     marginVertical: 4
                                }}>
                                    ${item.price}
                                </Text>
                            </View>
                        </View>
                    )
                  }
                />
            </View>
        </ScrollView>
     </View>
   </SafeAreaView>
  )
}

export default Home