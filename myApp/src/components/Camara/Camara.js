import React, {Component} from "react";
import{View,Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Camara} from 'expo-camera';
import {db, storage} from '../../firebase/config'



 class Camara extends Component {
    constructor(props){
        super(props)
        this.state = {
            permission:false,
            showCamara: true,
            url: ''
        }
        this.metodosCamara = ''
    }
    componentDidMount(){
        Camara.requestCameraPermissionsAsync()
            .then ( ()=> this.setState({
                permission: true,
            })
            )
            .catch(err => console.log(err))
    }
    tomarFoto(){
        this.metodosCamara.takePictureAsync()
            .then( photo => {
                this.setState({
                    //obtengo la url temporal para guardarla en un estado
                    url: photo.uri,
                    showCamara: false
                })
            })
            .catch(err => console.log(err))
    }
    guardarFoto(){
        fetch(this.state.url)
        .then ( response => response.blob())
        .then(
            image => {
                const ref = storage.ref(`photos/${Date.now()}.jpg`);
                ref.put(image)
                    .then( () =>{
                        ref.getDownloadURL()
                        .then( url =>{
                            this.props.onImageUpload(url) //viene dell padre
                        })
                        .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
            }
        )
        .catch(error => console.log(error))
    }

    eliminarPreview(){
        this.setState({
            url: '',
            showCamara: true,
        })
    }


  render() {
    return (
      <View>
        <Text>Camara</Text>
      </View>
    )
  }
}

export default Camara;