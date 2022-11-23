import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home/Home'
import ProfileFriends from '../screens/ProfileFriends/ProfileFriends'
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
             <Stack.Screen
            name='ProfileFriends'
            component={ProfileFriends}
        />
      </Stack.Navigator>
    )
  }
}