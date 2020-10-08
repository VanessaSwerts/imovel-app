import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'

import logo from '../../assets/img/house_agreement.png'
import colors from '../consts/colors.json'

import InputArea from '../components/InputArea'

export default function SignIn() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === 'ios'}
    >
      <Image style={styles.logo} source={logo}></Image>
      <Text style={styles.title} >IMovel</Text>

      <InputArea icon={'envelope'} placeholder={'Entre com o seu email'} />
      <InputArea icon={'lock'} placeholder={'Entre com o sua senha'} password={true} />

      <TouchableOpacity
        style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["platinum"],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35
  },

  logo: {
    width: 110,
    height: 110,
  },

  title: {		
		fontSize: 48,
    fontWeight: "500",
		color: colors['yellow'],
    textAlign: 'center',  
	},

  button: {
    height: 45,
    alignSelf: 'stretch',
    backgroundColor: colors['yellow'],
    borderRadius: 24,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: colors['blue'],
    fontWeight: 'bold',
    fontSize: 16
  }
})