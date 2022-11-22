import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import MyCamara from '../../components/Camara/Camara'

class NewPost extends Component {
  constructor(props){
      super(props)
      this.state = {
        comentario: '',
        description: '',
        showCamara: true,
        url: '',
        likes: []
    }
  }
  enviarPost(comentario){
    db.collection('posts').add({
        owner: auth.currentUser.email,
        date: Date.now(),
        description: comentario,
        photo: this.state.url,
        likes: [],
        comments: []
     
    })
    .then(()=>{
        this.setState({comentario: ''})
    })
    .catch(err=> console.log(err))
}
onImageUpload(url){
  this.setState({
      url: url,
      showCamera: false,
  })
}

//  enviarPost(description){
//         db.collection('posts').add({
//             owner: auth.currentUser.email,
//             date: Date.now(),
//             description: description,
//             likes: [],
//             comments: []
//         })
//         .then(()=>{
//             this.setState({description: ''})
//         })
//         .catch(err=> console.log(err))
//     }


    render() {
    return (
      <View>
        {}
        <Text>Crea tu posteo</Text>
        <TextInput
        keyboardType='default'
        placeholder='Escribi una descripcion!'
        onChangeText={text => this.setState({comentario: text})}
        style= {styles.input}
        value={this.state.comentario}
        />
        <View>
            <TouchableOpacity onPress={()=> this.enviarPost(this.state.comentario)}>
            <Text>Subir Post</Text>
            </TouchableOpacity>
        </View>
        {/* <TextInput
        keyboardType='default'
        placeholder='Deja tu descripcion'
        onChangeText={text => this.setState({description: text})}
        style= {styles.input}
        value={this.state.description}
        />
        <TouchableOpacity
        onPress={()=> this.enviarPost()}>
            <Text>Enviar Post</Text>
        </TouchableOpacity> */}
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
export default NewPost