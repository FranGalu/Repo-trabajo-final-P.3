import { Text, View, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import Post from '../../components/Posts/Post'
import {FontAwesome} from '@expo/vector-icons'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'

class ProfileFriends extends Component {
  
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            mailFriend: props.route.params.email,
            userFriend:[], //deberia ser un objeto literal?
            postsFriend:[]
        }
    }

    componentDidMount(){
        db.collection('posts')
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
      
      db.collection('users').where('email', '==', this.state.mailFriend).onSnapshot(docs => {
        let users = []
        docs.forEach(doc => {
          users.push({
            id: doc.id,
            data: doc.data()
          })
        })
  
        this.setState({
          userFriend: users,
        },
        () => console.log(this.state.userFriend)
        )
      })
    }
  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>

        <li>
          <ul><Text>Su mail: {this.state.mailFriend} </Text></ul>
      
          <ul><Text>Tu amigo tiene {this.state.postsFriend.length} posteos!</Text></ul>
        </li>

       <FlatList
                data={ this.state.postsFriend}
                keyExtractor={ item => item.id.toString() }
                renderItem={({item}) => <Post navigation={this.props.navigation} data={item.data} id={item.id}/>} 
            /> 

{/* //Nombre de usuario. 
// Mini bio (si la cargó al registrarse).
// Foto de perfil (si cargó una al registrarse).
  */}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: '4%',
    backgroundColor: 'white'
}

})

export default ProfileFriends
