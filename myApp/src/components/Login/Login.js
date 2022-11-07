import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'

class Login extends Component{
    constructor(props){
        super(props)
            this.state= {
                email: '',
                pass: '',
            }
        }

    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
        .then((response) => {
            this.setState({loggedIn: true});
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <View>
                <Text>Login</Text>
                <TextInput
                keyboardType ='email-address'
                placeholder = 'email'
                onChangeText = {text => this.setState({email:text})}
                value = {this.state.email}
                />

                <TextInput
                keyboardType = 'default'
                placeholder = 'password'
                onChangeText = {text => this.setState({pass:text})}
                value = {this.state.pass}
                />

                <TouchableOpacity onPress = {()=> this.login(this.state.email, this.state.pass)}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
    }

export default Login