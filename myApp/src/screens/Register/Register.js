
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, RecyclerViewBackedScrollView, RefreshControlComponent, requireNativeComponent } from 'react-native'
import { auth, db } from '../../firebase/config'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'

export class Register extends Component {
    constructor(props){
                super(props)
                this.state={
                    username:'',
                    email:'',
                    pass:'',
                    bio: '',
                    error: '',
                    profileImage:''
                }
            }
        
        registroUsuario(username, email, pass, bio, error){
            if(email.includes('@') && username.length>=4 && pass.length>=6){
                auth.createUserWithEmailAndPassword(email, pass)
                .then(()=> {
                    return(
                        db.collection('users').add({
                            email: email,
                            username: username,
                            bio: bio,
                            createdAt: Date.now()
                        })
                    )
                })
                .then(resp => this.props.navigation.navigate('Home'))
                .catch(err => this.setState({error: err.message})) 
            } else if(username.length <= 4){
                this.setState({error:'El nombre de usuario requiere un minimo de 4 caracteres'})
            } else if (!email.includes('@')){
                this.setState({error:'El mail no esta completo'})        
            } else if (pass.length <= 6){
                this.setState({error:'La contraseña requiere un minimo de 6 caracteres'})        
            }
            }

            buscarImagen(){
                ImagePicker.launchImageLibraryAsync()
                .then(resp => {
                    fetch(resp.uri)
                    .then(data => data.blob())
                    .then(img => {
                        console.log(storage)
                        const ref = storage.ref(`profilePics/${Date.now()}.jpg`)
                        ref.put(img)
                        .then(()=> {
                            ref.getDownloadURL()
                            .then(url => {
                                    this.setState({profileImage:url})
                                }
                            )
                        })
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            }

    render() {
        return (
            <View style={styles.container}>
             <View>
                <Text>Register</Text>
                <Text style={styles.error}>{this.state.error}</Text>
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
                <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Escribe tu biografia'
                onChangeText={text => this.setState({bio: text})}
                value={this.state.bio}
                />
            
            <TouchableOpacity onPress={()=> this.buscarImagen()}>
                <Text style={styles.botonI}>Buscar imagen de perfil</Text>
            </TouchableOpacity>

                <View>
                     <TouchableOpacity onPress={()=> this.registroUsuario(this.state.username, this.state.email, this.state.pass, this.state.bio)} style={styles.botonR}>
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
      paddingHorizontal:24,
    },
    input:{
        borderWidth:1,
        borderRadius:35,
        height:20,
        paddingLeft:10,
        marginTop:10
    },
    containerRedirect:{
        marginTop: 32
    },
    image:{
        height: '100%'
    },
    error:{
        color: 'red'
    },
    botonR:{
        width:100,
        height:20,
        backgroundColor:'#DCC3F7',
        textAlign:'center',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
    botonI:{
        width:200,
        height:20,
        backgroundColor:'#DCC3F7',
        textAlign:'center',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
  })

export default Register




