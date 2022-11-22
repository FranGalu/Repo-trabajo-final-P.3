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
        <View style={styles.container}>
        <Text style={styles.hola}>Home</Text>
        <FlatList
        data={this.state.allPosts}
        keyExtractor={posts => posts.id.toString()}
        renderItem = { ({item}) => <Post navigation={this.props.navigation} data={item.data} id={item.id}/>}
       />
        </View>
    )
}
}

const styles = StyleSheet.create({
    hola: {
        fontSize: 20,
    },
    container:{
        flex:1,
        padding: '4%',
        backgroundColor: 'white'
    },
    content: {
        
        alignItems: 'center',
        marginTop: 80, 
        marginBottom: 60
    }, 
    box: {
        width: 150, 
        height: 100, 
        backgroundColor: 'white', 
        marginBottom: 10

    }

})
        
        
    

export default Home