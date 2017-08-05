import React from 'react'
import { View, Text } from 'react-native'
import theme from '../theme'

export default function () {
  return <View style={{borderRadius: 2, backgroundColor: theme.successColor, elevation: 1, padding: 5}}>
    <Text style={{textAlign: 'center'}}>Update successful</Text>
  </View>
}
