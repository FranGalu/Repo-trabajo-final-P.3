import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {auth} from '../../firebase/config'

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            input1='',
            input2='',
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
            <Text>Formulario</Text>
            <TextInput
                placeholder='Escribe tu email'
                keyboardType='email-address'
                onChangeText={text => this.setState({input1: text})}
                value={this.state.input1}
            />
            <TextInput
                placeholder='Escribe tu password'
                keyboardType='default'
                onChangeText={text => this.setState({input2: text})}
                value={this.state.input2}
                secureTextEntry={true}
            />
            <View>
                <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.input1, this.state.input2)}>
                    <Text>Registrarme</Text>
                </TouchableOpacity>
            </View>
          </View>
        )
      }
}

const styles = StyleSheet.create({

})

export default Register