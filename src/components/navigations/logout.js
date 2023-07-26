import { View, Text } from 'react-native'
import React from 'react'

const logout = () => {
  return (
    <View>
      <Image source={require('https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_540,c_limit/864c2d5e-6134-486a-b964-543056d58307/nike-just-do-it.png')} style={styles.container}>
</Image>
      <Text>logout</Text>
    </View>
  )
}

export default logout