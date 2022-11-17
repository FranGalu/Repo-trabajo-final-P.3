import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'

//Nombre de usuario. 
// Email del usuario.
// Mini bio (si la cargó al registrarse).
// Foto de perfil (si cargó una al registrarse).
// La cantidad total de posteos publicados por el usuario.
// Mostrar todos los posteos del usuario. 

// Permitir borrar posteos.
// Botón para el logout completo del usuario. Si el logout se realiza correctamente la aplicación debe redirigir al usuario a la pantalla de login.
// Las pantallas serán accesibles únicamente para los usuarios logueados.


class Perfil extends Component {

    //falta pasar las props de navegacion para que cuando haga sign out mande al usuario a la pagina login

    constructor(props){
        super(props)
        this.state ={
            allComments: []
        }
    }
//funciona una vez que enganchemos los comentarios
    componentDidMount(){
        db.collections('posts').onSnapshot(docs =>{
            let comments = []
            docs.forEach( doc => {
                comments.push({
                id: doc.id,
                data: doc.data()
                })
            })
            this.setState({
                allComments: comments
            })
        }) 
    }

    eliminar(){
        db.collection('users').doc
        .delete(

        ).then(()=> 
        this.props.navigation.navigate('Register'))
        
    }

    signOut(){
        auth.signOut()
    }
    render(){
return (
    <View>
      <Text>Este es tu perfil!</Text>

            <Text> El nombre del usuario</Text>
            <Text> La biografia del usuario</Text>
            <Text> {auth.currentUser.email} </Text> 

            <FlatList
                data={ this.state.allComments }
                keyExtractor={ item => item.id.toString() }
                renderItem={({item}) => <OnePost data={item.data} id={item.id}/>}
            /> 

    <TouchableOpacity onPress={()=> this.signOut()}>
        <text> Cerrar tu sesión</text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ () => this.eliminar()}>
                <Text>Eliminar perfil</Text>
            </TouchableOpacity>

    </View>
  )
}
}
 

export default Perfil