import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home/Home'

const Stack = createNativeStackNavigator()

export default class HomeNavigation extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
            name='Home'
            component={Home}
            options={{
                headerShown:false
            }}
        />
      </Stack.Navigator>
    )
  }
}