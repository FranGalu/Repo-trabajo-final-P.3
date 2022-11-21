import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator,TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import { db } from '../../firebase/config';
import Posts from '../Posts/Posts';
// import {db} from '../../firebase/config'

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            posts:[],
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('date', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })
                this.setState({
                    posts: posts,
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
        data={this.state.posts}
        keyExtractor={posts => posts.id}
        renderItem = { ({item})=> <Posts dataPost={item} />}
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