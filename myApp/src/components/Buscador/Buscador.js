import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native' //lo voy a usar mas adelante


// El proyecto debe contar con una pantalla que permita filtrar usuarios por email ó por user name. Los resultados que coincidan con la búsqueda deben aparecer de forma automática. 
// Cada equipo decidirá si usa email o user name. Los resultados deben permitir navegar hasta el perfil del usuario.
// En caso de que el filtrado no obtenga resultados la pantalla mostrará el mensaje: “El email/ user name no existe”. 




//uso el modelo del proyecto anterior, me falta cambiar y adaptar "usuario"

class Buscador extends Component {
    constructor(props){
        super(props)
        this.state = {
            valorInput:'',
            tipoDeBusqueda:'album',
        }
    }

    preventSubmit(event){
        event.preventDefault()
    }

    controlarInput(event){
      if(event.target.id === 'inputSearch'){
          this.setState({
              valorInput: event.target.value
            }, 
            ()=> this.props.funcionQueBusca(this.state.valorInput, this.state.tipoDeBusqueda))
      } else {
        this.setState({
          tipoDeBusqueda: event.target.value
          }, 
          ()=> this.props.funcionQueBusca(this.state.valorInput, this.state.tipoDeBusqueda))
      }
    }

  render() {
    return (
      <form onSubmit={(event)=> this.prevenirSubmit(event)}>
        <input type='text' id='inputSearch' onChange={(event)=> this.controlarInput(event)} value={this.state.valorInput}/>
        <label htmlFor='usuario'>
          <input checked={this.state.tipoDeBusqueda === 'usuario'} id='usuario' type='radio' name='tipoDeBusqueda' onChange={(event) => this.controlarInput(event)} value='usuario' />
        </label>
      </form>
    )
  }
}

export default Buscador