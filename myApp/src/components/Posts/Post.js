import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import {FontAwesome} from '@expo/vector-icons'
import NewPost from '../../screens/Posts/NewPost'


class Post extends Component {
    constructor(props){
        super(props)
    this.state = {
        //likeCount: this.props.data.likes.length,
        //commentCount: this.props.data.comments.length,
        myLike: false //arranca en false para tener el boton Like presente
    }
}

// componentDidMount(){
//     let like = this.props.data.likes.includes(auth.currentUser.email) //con este includes valido el usuario
//     if(like){
//         this.setState({
//             myLike: true
//         })
//     }
// }
// like(){
//     db.collection('posts')
//     .doc(this.props.id)
//     .update({
//         likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //actualiza arrays en firebase
//     })
//     .then(()=> {
//         this.setState({
//             myLike: true,
//             likeCount: this.state.likesCount + 1
//         })
//     })
//     .catch(err => console.log(err))
// }
// unlike(){
//     db.collection('posts')
//     .doc(this.props.id)
//     .update({
//         likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) 

//     })
//     .then(()=> {
//         this.setState({
//             myLike: false,
//             likeCount: this.state.likesCount - 1
//         })
//     })
//     .catch(err => console.log(e))
// }
deletePost(){

    db.collection("posts").doc(this.props.data.id).delete();
}

render(){
    return(
        <View style={styles.separator}>
            <View> <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'HomeNavigation',
            {
              screen: 'ProfileFriends',
              params: {
                email: this.props.data.owner
              }
            }
          )}> 
          { this.props.data.owner == auth.currentUser.email ?(
                    <TouchableOpacity onPress={()=> this.deletePost()}>
                        <Text style={styles.eliminar}>Eliminar Post</Text>
                    </TouchableOpacity> 
                    ):""}
        <Text>Posteo de:{this.props.data.owner}</Text>
        <Image
            style={styles.image}
            resizeMode='center'
            source={{uri:this.props.data.url}}
        />
        </TouchableOpacity>
            </View>
            <Text>{this.props.data.description}</Text>
            <View>
            <Text>{this.state.likeCount}</Text> 
                
                {/* {
                    this.state.myLike ?
                    <TouchableOpacity onPress={()=> this.unlike()}>
                    <FontAwesome name='heart' color='pink' size={20} />
                </TouchableOpacity>
                : //si es false, que aparezca like
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome name='heart-o' color='black' size={20} />
                </TouchableOpacity>
                } */}
                
                
            </View>
        </View>
    )
}

}

const styles = StyleSheet.create({
    separator:{
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
        marginBottom: 10,
        paddingHorizontal:20
    },
    image:{
        height: 300,
        width: 200,
    }, 
    detallesCont:{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    detalles:{
        display: 'flex',
        gap: 5,
        flexDirection: 'row',

    },
    eliminar:{
        color: 'red',
    },
    
    


    
})


//post
export default Post