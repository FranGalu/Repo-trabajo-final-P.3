import  {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native'; 
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
            todosComentarios: []
        }
    }

componentDidMount(){
    db.collection('posts').onSnapshot(docs => {
        let comentarios = []
        docs.forEach(doc => {
            comentarios.push({
                id: doc.id,
                data: doc.data()
            })
           
        })
        this.setState({
            todosComentarios: comentarios
        }, () => console.log(this.state.todosComentarios))
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
        this.props.navigation.navigate('Login')
    }
    render(){
return (
    <View>
        <div>
      <Text>Este es tu perfil!</Text>
            <li>
           <ul><Text> El nombre del usuario</Text></ul>
           <ul><Text> La biografia del usuario</Text></ul> 
           <ul><Text> Tu mail: {auth.currentUser.email} </Text> </ul>
            </li>

            {/* //Falta completar flatlist */}
            <FlatList
                data={ this.state.todosComentarios }
                keyExtractor={ item => item.id.toString() }
                renderItem={({item}) => <NoTengoLaData data={item.data} id={item.id}/>}
            /> 

    <TouchableOpacity onPress={()=> this.signOut()}>
        <text> Cerrar tu sesión</text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ () => this.eliminar()}>
                <Text>Eliminar perfil</Text>
            </TouchableOpacity>
            </div>

    </View>
  )
}
}
 

export default Perfil