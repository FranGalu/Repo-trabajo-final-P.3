
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, RecyclerViewBackedScrollView, RefreshControlComponent, requireNativeComponent } from 'react-native'
import { auth, db } from '../../firebase/config'
import {storage} from '../../firebase/config'
import * as ImagePicker from 'expo-image-picker'
import React, { Component } from 'react'

export class Register extends Component {
    constructor(){
                super()
                this.state={
                    username:'',
                    email:'',
                    pass:'',
                    bio: '',
                    imgPerfil:''
                }
            }
        
        registroUsuario(username, email, pass, bio, imgPerfil){
                auth.createUserWithEmailAndPassword(email, pass)
                .then(()=> {
                    return(
                        db.collection('users').add({
                            email: email,
                            username: username,
                            bio: bio,
                            imgPerfil: imgPerfil,
                            createdAt: Date.now()
                        })
                    )
                })
                .then(resp => this.props.navigation.navigate('Home'))
                .catch(err => console.log(err)) 
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
                {/* <Image style={styles.image}
                source={{uri: 'https://images.pexels.com/photos/235994/pexels-photo-235994.jpeg?cs=srgb&dl=pexels-pixabay-235994.jpg&fm=jpg'}}
                resizeMode='contain'
                /> */}
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
                <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Escribe tu biografia'
                onChangeText={text => this.setState({bio: text})}
                value={this.state.bio}
                />
                 <View>
                    <TouchableOpacity onPress={()=> this.buscarImagen()}>
                         <Text>Buscar imagen de perfil</Text>
                    </TouchableOpacity>
                    </View>
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
      paddingHorizontal:24,
    },
    input:{
        borderWidth:1
    },
    containerRedirect:{
        marginTop: 32
    },
    image:{
        height: '100%'
    }
  })

export default Register




