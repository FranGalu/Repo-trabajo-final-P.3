import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import Post from '../../components/Posts/Post'


//a los usuarios nuevos no les aparece su nombre de usuario :(

class Perfil extends Component {

  constructor(props) {
    super(props)
    this.state = {
      allPosts: [],
      infoUser: {},
      id: ''
    }
  }
  componentDidMount() {

    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
      let posts = []
      docs.forEach(doc => {
        posts.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({
        allPosts: posts
      },
        () => console.log(this.state.allPosts)
      )

    })

    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(doc => {
        doc.forEach(doc =>
          this.setState({
            id: doc.id,
            infoUser: doc.data()
          }),
          () => console.log(this.state.infoUser)
          )
      })


  }

  signOut() {
    auth.signOut()
    this.props.navigation.navigate('Login')
  }

  deletePost(){

    db.collection('posts').doc(this.props.data.id).delete();
}

  render() {
    return (
      <View style={styles.container}>

        <Text>Este es tu perfil!</Text>

        <li>
          <ul><Text > Bienvenido a tu perfil {this.state.infoUser.username}! </Text></ul>
          <ul><Text> descripcion: {this.state.infoUser.bio}</Text></ul>
          <ul><Text> Tu mail: {auth.currentUser.email} </Text> </ul>
          <ul><Text> Fecha de creación de tu perfil: {auth.currentUser.metadata.creationTime} </Text> </ul>
          <ul><Text> Ya subiste {this.state.allPosts.length} posteos! Segui asi! </Text></ul>
        </li>

        

        <FlatList
        data={this.state.allPosts}
        keyExtractor={posts => posts.id.toString()}
        renderItem = { ({item})=> 
        <Post navigation={this.props.navigation} data={item.data} id={item.id}/>} 
        />


        <TouchableOpacity onPress={() => this.signOut()}>
          <text> Cerrar tu sesión</text>
        </TouchableOpacity>


      </View>
    )
  }
}
const styles = StyleSheet.create({
  content: {
      
      alignItems: 'center',
      marginTop: 80, 
      marginBottom: 60
  },
  container:{
    flex:1,
    padding: '4%',
    backgroundColor: 'white'
}

})


export default Perfil