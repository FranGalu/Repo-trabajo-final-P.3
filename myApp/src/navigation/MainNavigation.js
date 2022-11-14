import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNaviteStackNavigator} from '@react-navigation/native-stack'
import TabNavigation from './TabNavigation'
import LoginScreen from '../screens/Login/LoginScreen'
import RegisterScreen from '../screens/Register/RegisterScreen'
const Stack = createNaviteStackNavigator()

function MainNavigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={{
                    headerShown: false
                }}
                />
                <Stack.Screen
                name='Register'
                component={RegisterScreen}
                options={{
                    headerShown: false
                }}
                />
                <Stack.Screen
                name='TabNavigation'
                component={TabNavigation}
                options={{
                    headerShown: false
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation