import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import MyCamara from '../../components/Camara/Camara'

class NewPost extends Component {
  constructor(props){
      super(props)
      this.state = {
        comentario: '',
        showCamara: true,
        url: '',
    }
  }
  enviarPost(comentario){
    db.collection('posts').add({  //en esta coleccion guardamos los documentos
        owner: auth.currentUser.email,
        date: Date.now(),
        description: comentario,
        url: this.state.url,
        likes: [],
        comments: []
    })
    .then(()=>{
        this.setState({
          comentario: '',
          // showCamara: true, 
          // url: ''
        })
    })
    .catch(err=> console.log(err))
}
onImageUpload(url){
  this.setState({
      url: url, //nos llega por parametro la url
      showCamara: false,
  })
}



    render() {
    return (
    
       <View style={styles.container}>
         {this.state.showCamara ?
         
         <MyCamara onImageUpload={(url) => this.onImageUpload(url)}/> 
        : 
        <View>
          <Text style={styles.title}>Crea tu posteo</Text>
        <TextInput
          keyboardType='default'
          placeholder='Escribi una descripcion!'
          onChangeText={text => this.setState({comentario: text})} //modifica el estado de mi description
          style= {styles.input}
          value={this.state.comentario} 
        />
        <View>
            <TouchableOpacity style={styles.button} onPress={()=> this.enviarPost(this.state.comentario) }>
            <Text>Subir Post</Text>
            </TouchableOpacity>
        </View>
        </View>
        }       
      
        
      
      </View>
      
    )
  }
}
const styles = StyleSheet.create({
    container:{
      
      height: '100%',
      display: 'flex',
      marginTop: 10,
      alignItems: 'center',
      backgroundColor: 'white'
    },  
    input:{
        height: 60,
        width: 200,
        borderWidth:1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    title:{
      fontFamily: 'arial',
      textAlign: 'center',
      marginBottom: 15,
      fontSize: 30,
      color: 'black'
    },
    button: {
      display: "flex", 
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      backgroundColor: 'purple',
      width: 100, 
      height: 30
  }

})
export default NewPost