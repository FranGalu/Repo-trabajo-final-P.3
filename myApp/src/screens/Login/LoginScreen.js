import { Text , View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, {Component} from "react";
import { auth } from "../../firebase/config"

class LoginScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            pass:'',
            error:''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user !== null){
                this.props.navigation.navigate('TabNavigation')
            }
        })
    }

    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
        .then(response => {
            this.props.navigation.navigate('TabNavigation')
        })
        .catch(err => this.setState({error: err.message}))
    }

    render(){
        return(
            <View style={styles.container}>
            <View>
                <Text>Login</Text>
                <Text style={styles.error}>{this.state.error}</Text>
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
                        <Text style={styles.boton}>Log In</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Aun no tienes cuenta?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
                        <Text>Register</Text>
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
        borderWidth:1,
        borderRadius:35,
        height:20,
        paddingLeft:10,
        marginTop:10
    },
    boton:{
        width:100,
        height:20,
        backgroundColor:'#DCC3F7',
        textAlign:'center',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
    error:{
        color: 'red'
    }
  })

export default LoginScreen