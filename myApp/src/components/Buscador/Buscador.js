import  {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native';
import React, { Component } from 'react'
import { db, auth} from '../../firebase/config'
import firebase from 'firebase'
import HomeNavigation from '../../navigation/HomeNavigation';

class Buscador extends Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      buscar: '', 
      perfilRedirect: 'ProfileFriends',
      guardarValor: '',
      lista: '',
      mensaje: '',
    }
  }
  componentDidMount() {
    db.collection('users')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let search = [] 
        docs.forEach(doc => {
          search.push({
            id: doc.id,
            data: doc.data()
          })
        })

        this.setState({
          guardarValor: search,
          lista: search,

        })

      })
  }
  buscarData(valor) {

    let userFiltrado = this.state.lista.filter(elm => {
      if (elm.data.email.includes(valor)) {
        return elm
      }
    })

    this.setState({ buscar: valor })
    if (userFiltrado.length > 0) {

      this.setState({
        guardarValor: userFiltrado,
      })
    }
     else {
      this.setState({
        mensaje: 'No encontramos a tu amigo :('
      })
    }
  }


  render() {
    return (
      <View>
        <TextInput
          style={styles.container}
          placeholder='Encontra a tus amigos!'
          keyboardType='default'
          onChangeText={search => this.buscarData(search)}
          value={this.state.buscar}
        />
        <FlatList
          style={styles.container2}
          data={this.state.guardarValor}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'HomeNavigation',
            {
              screen: 'ProfileFriends',
              params: {
                email: item.data.email
              }
            }
          )}> 
         
            <Text style={styles.container3}>{item.data.email}</Text>
            </TouchableOpacity>
            }
        />
        <Text>{this.state.mensaje}</Text>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 300,
    alignSelf: 'center',
    borderWidth: 3,
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "rgb(106, 90, 205)",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
  },
  container2: {
    textAlign: 'center',
    marginVertical: 5,
    padding: 15,
    marginTop: 20,
    width: '100%',
    marginHorizontal: 10
  },
  container3: {
    textAlign: 'center',
    padding: 15,
    fontSize: "1.5rem",
    fontFamily: '-apple-system',
    fontWeight: 300,

  },
})

export default Buscador;