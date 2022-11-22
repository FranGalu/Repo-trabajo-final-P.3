import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator,TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import { db } from '../../firebase/config';
import NewPost from '../Posts/NewPost';
import Post from '../../components/Posts/Post';
// import {db} from '../../firebase/config'

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            allPosts:[],
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('date', 'desc').onSnapshot( //con snapshot estamos trayendo la data actualizada
            docs => {
                let posts = [];
                docs.forEach( doc => { //ese forEach es bucle de firebase
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    allPosts: posts,
                    loading: false
                })
            }
        )
    }
render(){
    return(
        <View style={styles.hola}>
        <Text style={styles.hola}>Home</Text>
        <FlatList
        data={this.state.allPosts}
        keyExtractor={posts => posts.id.toString()}
        renderItem = { ({item})=> 
        <Text>"{item.data.description}"  de: 
        <TouchableOpacity>{item.data.owner}</TouchableOpacity> </Text>} //<Post data = {item.data}/>} no funciona
        />

        </View>
    )
}
}

const styles = StyleSheet.create({
    hola: {
        fontSize: 20,
    }
})

export default Home