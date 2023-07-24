import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, images } from '../constants'
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons"

const Details = ({ navigation }) => {
    const [isFavourite,setIsFavourite] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity,setQuantity] = useState(1);

    const handleSizeSelection = (size)=>{
        setSelectedSize(size);
    }
  return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: COLORS.white
    }}>
        <View style={{
            flex: 1,
            backgroundColor: COLORS.gray
        }}>
            <View style={{
                marginHorizontal: 22,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                position: "absolute",
                width: SIZES.width - 44,
                top: 22,
                zIndex: 999
            }}>
                <TouchableOpacity
                  onPress={()=>navigation.goBack()}
                >
                    <MaterialIcons
                      name="keyboard-arrow-left"
                      size={24}
                      color={COLORS.black}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={()=>setIsFavourite(!isFavourite)}
                >
                   {
                    isFavourite ? (
                        <Ionicons
                          name="md-heart-sharp"
                          size={24}
                          color={COLORS.black}
                        />
                    ) : (   
                        <Ionicons
                        name="md-heart-outline"
                        size={24}
                        color={COLORS.black}
                      />
                    )
                   }
                </TouchableOpacity>
            </View>

            <Image
              source={images.shirtDetails}
              resizeMode='cover'
            />

             <View style={{
                backgroundColor: COLORS.white,
                borderRadius: 36,
                paddingHorizontal: 22,

                paddingVertical: 22,
                position: "absolute",
                width: "100%",
                bottom: 0
             }}>
                <Text style={{...FONTS.h3}}>Mike Swoosh</Text>
                <Text style={{...FONTS.body3}}>Women's medium support</Text>

                <View style={{marginVertical: 22}}>
                    <Text style={{...FONTS.h4}}>Select Size</Text>

                    <View style={{
                        flexDirection: "row",
                        marginVertical: 18
                        }}>
                        <TouchableOpacity
                          style={
                            [
                                styles.checkboxContainer,
                                selectedSize === "S" && styles.selectedCheckbox
                            ]
                          }

                          onPress={() => handleSizeSelection("S")}
                        >
                            <Text style={
                                [
                                    selectedSize === "S" && styles.checkboxText
                                ]
                            }>S</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={
                            [
                                styles.checkboxContainer,
                                selectedSize === "M" && styles.selectedCheckbox
                            ]
                          }

                          onPress={() => handleSizeSelection("M")}
                        >
                            <Text style={
                                [
                                    selectedSize === "M" && styles.checkboxText
                                ]
                            }>M</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={
                            [
                                styles.checkboxContainer,
                                selectedSize === "L" && styles.selectedCheckbox
                            ]
                          }

                          onPress={() => handleSizeSelection("L")}
                        >
                            <Text style={
                                [
                                    selectedSize === "L" && styles.checkboxText
                                ]
                            }>L</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={
                            [
                                styles.checkboxContainer,
                                selectedSize === "XL" && styles.selectedCheckbox
                            ]
                          }

                          onPress={() => handleSizeSelection("XL")}
                        >
                            <Text style={
                                [
                                    selectedSize === "XL" && styles.checkboxText
                                ]
                            }>XL</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{...FONTS.h4}}>Qty</Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    marginVertical: 6
                }}>
                    <View style={{
                        backgroundColor: COLORS.gray,
                        height: 48,
                        width: 134,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: 'center',
                        paddingHorizontal: 12,
                        borderRadius: 24
                    }}>
                            <TouchableOpacity
                              onPress={()=>{
                                if(quantity >  1){
                                    setQuantity(quantity-1)
                                }
                              }}
                              style={{
                                height: 32,
                                width: 32,
                                borderRadius: 16,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: "center"
                              }}
                            >
                                <Feather
                                  name="minus"
                                  size={24}
                                  color={COLORS.black}
                                />
                            </TouchableOpacity>
                            <Text style={{...FONTS.body3}}>{quantity}</Text>

                            <TouchableOpacity
                              onPress={()=>{
                                    setQuantity(quantity+1)
                              }}
                              style={{
                                height: 32,
                                width: 32,
                                borderRadius: 16,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: "center"
                              }}
                            >
                                <Feather
                                  name="plus"
                                  size={24}
                                  color={COLORS.black}
                                />
                            </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: "column"}}>
                         <Text style={{...FONTS.body4}}>Total Price</Text>
                         <Text style={{...FONTS.h3}}>$18.00</Text>
                    </View>
                </View>

                <TouchableOpacity
                  style={styles.button}
                >
                    <Feather
                      name="shopping-bag"
                      size={24}
                      color={COLORS.white}
                    />

                    <Text style={{
                        ...FONTS.h3,
                        color: COLORS.white,
                        marginLeft: 12
                    }}>Add to Bag</Text>
                </TouchableOpacity>
            </View>      
        </View>

    </SafeAreaView>
  )
}


const styles= StyleSheet.create({
    checkboxContainer:{
        alignItems: "center",
        justifyContent: 'center',
        height: 44,
        width: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.gray,
        marginRight: 12
    },
    selectedCheckbox:{
        backgroundColor: COLORS.black
    },
    checkboxText:{
        color: COLORS.white,
        fontSize: 12
    },
    button:{
        marginTop: 12,
        height: 60,
        width: SIZES.width - 44,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.black
    }
})
export default Details