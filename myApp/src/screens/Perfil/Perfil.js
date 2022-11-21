import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'

//Nombre de usuario.  !
// Email del usuario. !
// Mini bio (si la cargó al registrarse). !
// Foto de perfil (si cargó una al registrarse). X
// La cantidad total de posteos publicados por el usuario. X
// Mostrar todos los posteos del usuario.  X

// Permitir borrar posteos. X
// Botón para el logout completo del usuario. Si el logout se realiza correctamente la aplicación debe redirigir al usuario a la pantalla de login. !
// Las pantallas serán accesibles únicamente para los usuarios logueados. !


class Perfil extends Component {

  //falta pasar las props de navegacion para que cuando haga sign out mande al usuario a la pagina login

  constructor(props) {
    super(props)
    this.state = {
      allComments: [],
      infoUser: {},
      id: ''
    }
  }
  componentDidMount() {

    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
      let posts = []
      docs.forEach(doc => {
        posts.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({
        allComments: posts
      },
        () => console.log(this.state.allComments)
      )

    })

    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(doc => {
        doc.forEach(doc =>
          this.setState({
            id: doc.id,
            infoUser: doc.data()
          }))
      })


  }

  //   componentWillUnmount(){
  //     db.collection('users').onSnapshot(
  //         docs=>{
  //             let usuario = [];
  //             docs.forEach( doc =>{
  //                 usuario.push({
  //                     id: doc.id,
  //                     data: doc.data()
  //                 })
  //                 this.setState({

  //                 })
  //             })
  //         }
  //     )
  //     }

  // eliminar(){
  //     db.collection('users').doc
  //     .delete(

  //     ).then(()=> 
  //     this.props.navigation.navigate('Register'))

  // }

  signOut() {
    auth.signOut()
    this.props.navigation.navigate('Login')
  }
  render() {
    return (
      <View>
        
          <Text>Este es tu perfil!</Text>
          
          <li>
            <ul><Text > Bienvenido a tu perfil {this.state.infoUser.username}! </Text></ul>
            <ul><Text> La biografia del usuario</Text></ul>
            <ul><Text> Tu mail: {auth.currentUser.email} </Text> </ul>
            <ul><Text> Tu perfil se creo: {auth.currentUser.metadata.creationTime} </Text> </ul>
          </li>

          {/* <View style={styles.container}>
            <Text> Ha subido un total de {this.state.post.length} posteos </Text>
            <FlatList
              data={this.state.allComments}
              keyExtractor={(data) => data.id.toString()}
              renderItem={(item) => <Post data={item} id={item.item.id} />}
            />
          </View> */}


          <TouchableOpacity onPress={() => this.signOut()}>
            <text> Cerrar tu sesión</text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={ () => this.eliminar()}>
                <Text>Eliminar perfil</Text>
            </TouchableOpacity> */}

      </View>
    )
  }
}
export default Perfil