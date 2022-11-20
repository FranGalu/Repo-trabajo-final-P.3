import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'

class Posts extends Component {
  constructor(){
      super()
      this.state = {
        comentario: '',
        description: ''
    }
  }
//   enviarComentario(comentario){
//     db.collection('posts').add({
//         owner: auth.currentUser.email,
//         date: Date.now(),
//         comment: comentario 
//     })
//     .then(()=>{
//         this.setState({comentario: ''})
//     })
//     .catch(err=> console.log(err))
// }

 enviarPost(description){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            date: Date.now(),
            description: description,
            likes: [],
            comments: []
        })
        .then(()=>{
            this.setState({description: ''})
        })
        .catch(err=> console.log(err))
    }


    render() {
    return (
      <View>
        {/* <Text>Crea tu posteo</Text>
        <TextInput
        keyboardType='default'
        placeholder='Escribi tu comentario!'
        onChangeText={text => this.setState({comentario: text})}
        style= {styles.input}
        value={this.state.comentario}
        />
        <View>
            <TouchableOpacity onPress={()=> this.enviarComentario(this.state.comentario)}>
            <Text>Enviar comentario</Text>
            </TouchableOpacity>
        </View> */}
        <TextInput
        keyboardType='default'
        placeholder='Deja tu descripcion'
        onChangeText={text => this.setState({description: text})}
        style= {styles.input}
        value={this.state.description}
        />
        <TouchableOpacity
        onPress={()=> this.enviarPost()}>
            <Text>Enviar Post</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    input:{
        height: 64,
        borderWidth:1,
    }
})
export default Posts