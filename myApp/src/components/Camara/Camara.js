import React, {Component} from "react";
import{View,Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Camera} from 'expo-camera';
import {storage} from '../../firebase/config'



 class MyCamara extends Component {
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
        Camera.requestCameraPermissionsAsync()
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
        <View style={styles.camera}>
        { this.state.permission ?
            this.state.showCamara ?
            <View style={styles.camera}>
                <Camera
                    style={styles.camera}
                    type= {Camera.Constants.Type.front}
                    ref= {metodos => this.metodosCamara = metodos} //mtodos lo que recibimos por parametros
                   /> 
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.tomarFoto()}>
                    <Text>Tomar Foto</Text>    
                </TouchableOpacity>   
            </View>
            :
            <View style={styles.camera}>
                <Image
                style={styles.preview}
                source={{uri:this.state.url}}
                resizeMode='cover'  //igual cover llega por default
                />
                <TouchableOpacity
                styles={styles.buttonGuardar}
                onPress={()=> this.guardarFoto()}>
                    <Text style={styles.buttonText}>Guardar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.buttonGuardar}
                onPress={()=> this.eliminarPreview}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
            :
            <Text> No tengo permitido usar la camara</Text>
        }
        </View>
        )}
    
    

}

const styles =StyleSheet.create({
    camera: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: 250,
        width: '80%',
        marginBottom: '4%',
        gap: 10
    },
    button:{
        display: 'flex',
        backgroundColor: 'white',
        height: 50,
        width: 150,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "black",
        borderWith: 1,
        padding: 5,
        marginTop: 10
    },
    buttonGuardar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding:3,
        backgroundColor: 'red',
        width: 100, 
        height: 30
    },
    preview:{
        height:400,
        alignContent: "center",
        flex: 6, 
        width: 400,
    },
    buttonText: {
        color: 'black'
    },
})

export default MyCamara;