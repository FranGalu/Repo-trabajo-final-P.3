import React, {Component} from 'react'
import { TextBase, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { auth, db } from '../../firebase/config'
import {storage} from '../../firebase/config'

class Register extends Component{
    constructor(){
        super()
        this.state={
            username:'',
            email:'',
            pass:''
        }
    }

    registroUsuario(username, email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
        .then(()=> {
            return(
                db.collection('users').add({
                    email: email,
                    username: username,
                    createdAt: Date.now()
                })
            )
        })
        .then(resp => this.props.navigation.navigate('Home'))
        .catch(err => console.log(err)) 
    }

    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Text>Register</Text>
                    <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Escribe tu nombre de usuario'
                    onChangeText={text => this.setState({username: text})}
                    value={this.state.username}
                    />
                    <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='Escribe tu email'
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                    />
                    <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Escribe tu password'
                    onChangeText={text => this.setState({pass: text})}
                    value={this.state.pass}
                    secureTextEntry={true}
                    />
                    <View>
                        <TouchableOpacity onPress={()=> this.registroUsuario(this.state.username, this.state.email, this.state.pass)}>
                            <Text>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text>Ya tenes una cuenta?</Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View>
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
    },
    containerRedirect:{
        marginTop: 32
    }
  })

export default Register