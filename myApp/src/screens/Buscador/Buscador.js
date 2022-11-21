import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator,TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import Buscador from '../../components/Buscador/Buscador'

// import {db} from '../../firebase/config'

class BuscadorScreen extends Component{
render(){
    return(
        <View>
        <Text style={styles.hola}>A quien deseas buscar?</Text>
        <Buscador/>
        </View>
    )
}
}

const styles = StyleSheet.create({
    hola: {
        fontSize: 20,
        textAlign: 'center'
    }
})

export default BuscadorScreen