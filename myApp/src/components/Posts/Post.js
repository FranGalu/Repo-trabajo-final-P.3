import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import {FontAwesome} from '@expo/vector-icons'
import NewPost from '../../screens/Posts/NewPost'


class Post extends Component {
    constructor(props){
        super(props)
    this.state = {
        likeCount: props.data.likes.lenght,
        commentCount: props.data.comments.lenght,
        myLike: false //arranca en false para tener el boton Like presente
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
            <Text>{this.props.data.description}</Text>
            {
                this.state.myLike ?
                <TouchableOpacity onPress={()=> this.unlike()}>
                <FontAwesome name='heart' color='pink' size={15} />
            </TouchableOpacity>
            : //si es false, que aparezca like
            <TouchableOpacity onPress={()=> this.like()}>
                <FontAwesome name='heart-o' color='black' size={15} />
            </TouchableOpacity>
            }
            
            
        </View>
    )
}

}



export default Post