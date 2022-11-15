import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Home from '../screens/Home/Home'
import HomeNavigation from './HomeNavigation'
const Tab = createBottomTabNavigator()

export default function TabNavigation(){
    return(
        <Tab.Navigator>
            <Tab.Screen 
            name='HomeNavigation' 
            component={HomeNavigation}
            options={{
                tabBarIcon: () => <Ionicons name="happy" size={24} color="black" />,
                headerShown:false
            }}
            />
        </Tab.Navigator>
    )
}