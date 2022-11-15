import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'

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

    signOut(){
        auth.signOut()
    }
    render(){
return (
    <View>
      <Text>Este es tu perfil!</Text>
      <TouchableOpacity onPress={()=> this.signOut()}>
        <text> Cerrar tu sesión</text>
      </TouchableOpacity>
    </View>
  )
}
}
 

export default Perfil