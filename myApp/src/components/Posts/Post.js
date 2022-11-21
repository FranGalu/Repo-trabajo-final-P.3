import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import {FontAwesome} from '@expo/vector-icons'


class Post extends Component {
    constructor(props){
    this.state = {
        likeCount: props.data.likes.lenght,
        commentCount: props.data.comments.lenght,
        myLike: false
    }
}

componentDidMount(){
    let like = this.props.data.likes.includes(auth.currentUser.email)
    if(like){
        this.setState({
            myLike: true
        })
    }
}
like(){
    db.collection('posts')
    .doc(this.props.id)
    .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //actualiza arrays en firebase
    })
    .then(()=> {
        this.setState({
            myLike: true,
            likeCount: this.state.likesCount + 1
        })
    })
    .catch(err => console.log(err))
}
unlike(){
    db.collection('posts')
    .doc(this.props.id)
    .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)

    })
    .then(()=> {
        this.setState({
            myLike: false,
            likeCount: this.state.likesCount - 1
        })
    })
    .catch(err => console.log(e))
}

render(){
    return(
        <View>
            <TouchableOpacity 
            onPress={()=> this.props.navigation.navigate(

            )}>

            </TouchableOpacity>
        </View>
    )
}

}



export default Post