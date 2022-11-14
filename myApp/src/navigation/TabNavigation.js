import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons'
import perfil from '../screens/Perfil/Perfil'
import Home from '../screens/Home/Home'
const Tab = createBottomTabNavigator()

function TabNavigation(){
    return(
        <Tab.Navigator>
            <Tab.Screen
            name='Home'
            component={Home}
            options={{
                tabBarIcon: () => <FontAwesome name='home' size={32} color='salmon'/>
            }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation