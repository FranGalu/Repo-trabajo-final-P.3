import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator,TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import {db} from '../../firebase/config'

class Home extends Component{
render(){
    return(
        <View>
        <Text>Hola</Text>
        </View>
    )
}
}

const styles = StyleSheet.create({
    hola: {
        fontSize: 20,
        fontFamily: ''
    }
})

export default Home