import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {auth} from '../../firebase/config'

class Register extends Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
        }
    }

    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
        .then(response => console.log(response))
        .catch(error => console.log(error))

    }
    
    render() {
        return (
          <View>
            <Text>Formulario de Registro</Text>
            <TextInput
                style={styles.input}
                placeholder='Escribe tu email de usuario'
                keyboardType='default'
                onChangeText={text => this.setState({email: text})}
                value={this.state.email}
            />
            <TextInput
                style={styles.input}
                placeholder='Escribe tu password'
                keyboardType='default'
                onChangeText={text => this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={true}
            />
            <View>
                <TouchableOpacity onPress={()=> this.register(this.state.email, this.state.password)}>
                    <Text>Registrarme</Text>
                </TouchableOpacity>
            </View>
          </View>
        )
      }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:24
    },
          
    input:{
        borderWidth:1
    }
})

export default Register