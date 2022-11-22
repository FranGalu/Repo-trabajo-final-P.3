import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator,TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import Buscador from '../../components/Buscador/Buscador'

class BuscadorScreen extends Component{
render(){
    return(
        <View>
        <Text style={styles.messi}>A quien deseas buscar?</Text>
        <Buscador/>
        </View>
    )
}
}
//porque no se le aplica?
const styles = StyleSheet.create({
    messi: {
    textAlign: 'center',
    padding: 15,
    fontSize: "1.5rem",
    fontFamily: '-apple-system',
    fontWeight: 300,
    }
})

export default BuscadorScreen