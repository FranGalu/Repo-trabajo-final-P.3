import { Text , View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, {Component} from "react";
import {auth} from "../../firebase/config"

class LoginScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            pass:''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user != null){
                this.props.navigation.navigate('TabNavigation')
            }
        })
    }

    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
        .then(response => {
            this.props.navigation.navigate('TabNavigation')
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <View style={styles.container}>
            <View>
                <Text>Login</Text>
                <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder='Ingresa tu email'
                onChangeText={text => this.setState({email: text})}
                value={this.state.email}
                />
                <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Ingresa tu password'
                onChangeText={text => this.setState({pass: text})}
                value={this.state.pass}
                secureTextEntry={true}
                />
                <View>
                    <TouchableOpacity onPress={()=> this.login(this.state.email, this.state.pass)}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Aun no tienes cuenta</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('TabNavigation')}>
                        <Text>Home</Text>
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
      }
  })

export default LoginScreen