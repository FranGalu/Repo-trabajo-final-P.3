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
            this.props.navigation.navigate('TabNavigation');
        })
        .catch(error => console.log(error))
    }

    render(){
        console.log(this.props);
        return(
            <View>
                <Text>Login</Text>
                <TextInput
                style={styles.input}
                keyboardType ='email-address'
                placeholder = 'email'
                onChangeText = {text => this.setState({email:text})}
                value = {this.state.email}
                />

                <TextInput
                style={styles.input}
                keyboardType = 'default'
                placeholder = 'password'
                onChangeText = {text => this.setState({pass:text})}
                value = {this.state.pass}
                secureTextEntry={true}
                />
            <View>
                <TouchableOpacity onPress = {()=> this.login(this.state.email, this.state.pass)}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
    }
    
    const styles = StyleSheet.create({
        input:{
            borderWidth:1
        }
    })

export default Login