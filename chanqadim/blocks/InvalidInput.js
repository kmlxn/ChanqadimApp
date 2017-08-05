import React from 'react'
import { View, Text } from 'react-native'
import theme from '../theme'

export default function () {
  return <View style={{borderRadius: 2, backgroundColor: theme.errorColor, elevation: 1, padding: 5}}>
    <Text style={{textAlign: 'center'}}>Invalid input</Text>
  </View>
}
