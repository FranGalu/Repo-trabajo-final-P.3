import { Text, View } from 'react-native'
import React, { Component } from 'react'
import {db} from '../../firebase/config'

//tengo que entender como usa las props para lograr tener el email del usuario amigo.

export default class ProfileFriends extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            mailFriend:props.route.params.email,
            postsFriend:[]
        }
    }

    componentDidMount(){
        db
        .collection('posts')
        .where('owner', '==', this.state.mailFriend)
        .onSnapshot(docs => {
            let posts = []
            docs.forEach(doc => posts.push({
                id:doc.id,
                data: doc.data()
            }))
            this.setState({
                postsFriend: posts
            }, ()=> console.log(this.state.postsFriend))
        })
    }
  render() {
    return (
      <View>
        <Text>ProfileFriends</Text>

{/* //Nombre de usuario. 
// Email del usuario.
// Mini bio (si la cargó al registrarse).
// Foto de perfil (si cargó una al registrarse).
// La cantidad total de posteos publicados por el usuario.
// Mostrar todos los posteos del usuario.  */}
      </View>
    )
  }
}