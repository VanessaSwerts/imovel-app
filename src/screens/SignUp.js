import React, { useState } from 'react'
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { InputArea, ImagePickerFunction } from '../components'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import api, { STORAGE_URL } from '../services/api'
import { formatPhoneNumber, formatCPF } from '../utils/util'
import { useLoading } from '../contexts/loading'

import colors from '../constants/colors.json'

export default function SignUp() {
  const navigation = useNavigation()
  const { startLoading, stopLoading } = useLoading()

  const [data, setData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    cpf: '',
    phone: '',
    password: '',
    confirmPassword: '',
    avatar: null
  })
  const [activeStep, setActiveStep] = useState(0)
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [passwordIsValid, setPasswordIsValid] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const onChange = (type, value) => {
    setData({ ...data, [type]: value })
  }

  const signUp = async () => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const formData = new FormData()

    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('name', data.name)
    formData.append('cpf', data.cpf)
    formData.append('phone', data.phone)
    if (data.avatar !== null) {
      formData.append('file', data.avatar)
    }

    startLoading()

    await api
      .post('/user', formData, config)
      .then(res => {
        navigation.navigate('SignIn')
      })
      .catch(err => {
        console.error(err)
      })

    stopLoading()
  }

  const handleEmail = () => {
    if (data.email !== data.confirmEmail) {
      setEmailIsValid(true)
      setEmailErrorMessage(
        'Ops, os e-mails são diferentes!\nPara prosseguir, é necessário preencher os campos corretamente!'
      )
    } else {
      setEmailIsValid(false)
      setEmailErrorMessage('')
    }
  }

  const handlePassword = () => {
    if (data.password !== data.confirmPassword) {
      setPasswordIsValid(true)
      setEmailErrorMessage(
        'Ops, as senha são diferentes!\nPara prosseguir, é necessário preencher os campos corretamente!'
      )
    } else {
      setPasswordIsValid(false)
      setEmailErrorMessage('')
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === 'ios'}
    >
      <ScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => navigation.goBack()}
          >
            <Icon name={'arrow-left'} size={20} color={colors.h1} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cadastrar</Text>
        </View>

        <Text style={styles.message}> É rápido, simples e gratuito!</Text>

        <ProgressSteps
          activeStep={activeStep}
          activeStepIconBorderColor={colors.blue}
          completedProgressBarColor={colors.blue}
          activeLabelColor={colors.blue}
          completedLabelColor={colors.blue}
          completedStepIconColor={colors.blue}
          completedCheckColor={colors['light-secondary']}
        >
          <ProgressStep
            key={0}
            testID="signUp-next-button-1"
            nextBtnText={'Próximo'}
            label="Pessoal"
            nextBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            scrollable={false}
            onNext={() => setActiveStep(activeStep + 1)}
          >
            <View style={styles.containerInput}>
              <Text style={styles.label}>Nome</Text>
              <InputArea
                testID="signUp-name-input"
                placeholder={'Ex: Pedro Henrique Santos'}
                value={data.name}
                onChangeText={value => onChange('name', value)}
              />
              <Text style={styles.label}>CPF</Text>
              <InputArea
                testID="signUp-cpf-input"
                placeholder={'xxx.xxx.xxx-xx'}
                value={formatCPF(data.cpf)}
                onChangeText={value => onChange('cpf', value)}
                keyboardType={'numeric'}
              />
              <Text style={styles.label}>Celular</Text>
              <InputArea
                testID="signUp-phone-input"
                placeholder={'(xx)xxxxx-xxxx'}
                value={formatPhoneNumber(data.phone)}
                onChangeText={value => {
                  onChange('phone', value)
                }}
                keyboardType={'phone-pad'}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            key={1}
            testID="signUp-next-button-2"
            label="Login"
            nextBtnText={'Próximo'}
            previousBtnText={'Anterior'}
            nextBtnStyle={styles.button}
            previousBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.buttonText}
            scrollable={false}
            onNext={() => setActiveStep(activeStep + 1)}
            onPrevious={() => setActiveStep(activeStep - 1)}
            removeBtnRow={emailIsValid}
          >
            <View style={styles.containerInput}>
              <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
              <Text style={styles.label}>E-mail</Text>
              <InputArea
                testID="signUp-email-input"
                placeholder={'Ex: pedrohs@gmail.com'}
                keyboardType={'email-address'}
                value={data.email}
                onChangeText={value => onChange('email', value)}
                onEndEditing={() => handleEmail()}
              />
              <Text style={styles.label}>Confirmar e-mail</Text>
              <InputArea
                testID="signUp-confirmEmail-input"
                placeholder={'Ex: pedrohs@gmail.com'}
                keyboardType={'email-address'}
                value={data.confirmEmail}
                onChangeText={value => onChange('confirmEmail', value)}
                onEndEditing={() => handleEmail()}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            key={2}
            testID="signUp-next-button-3"
            label="Senha"
            nextBtnText={'Próximo'}
            previousBtnText={'Anterior'}
            nextBtnStyle={styles.button}
            previousBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.buttonText}
            scrollable={false}
            onNext={() => setActiveStep(activeStep + 1)}
            onPrevious={() => setActiveStep(activeStep - 1)}
            removeBtnRow={passwordIsValid}
          >
            <View style={styles.containerInput}>
              <Text style={styles.messageEmail}>
                Para sua segurança, a senha deve ter no mínimo 8 caracteres, com
                números, letra maiúscula e minúscula e caracteres especiais.
              </Text>
              <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
              <Text style={styles.label}>Senha</Text>
              <InputArea
                testID="signUp-password-input"
                placeholder={'••••••••'}
                password={true}
                value={data.password}
                onChangeText={value => onChange('password', value)}
                onEndEditing={() => handlePassword()}
              />
              <Text style={styles.label}>Confirmar senha</Text>
              <InputArea
                testID="signUp-confirmPassword-input"
                placeholder={'••••••••'}
                password={true}
                value={data.confirmPassword}
                onChangeText={value => onChange('confirmPassword', value)}
                onEndEditing={() => handlePassword()}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            key={3}
            testID="signUp-submit-button"
            label="Foto"
            previousBtnText={'Anterior'}
            finishBtnText={'Finalizar'}
            nextBtnStyle={styles.button}
            previousBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.buttonText}
            scrollable={false}
            onSubmit={() => signUp()}
            onPrevious={() => setActiveStep(activeStep - 1)}
          >
            <View style={styles.containerInput}>
              <ImagePickerFunction
                onChange={image => onChange('avatar', image)}
              >
                <Image
                  source={{
                    uri: data.avatar
                      ? data.avatar.uri
                      : `${STORAGE_URL}/user/default-avatar.png`
                  }}
                  style={styles.avatar}
                />
              </ImagePickerFunction>
              <ImagePickerFunction
                onChange={image => onChange('avatar', image)}
              >
                <Text style={styles.avatarText}>Alterar</Text>
              </ImagePickerFunction>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['light-primary'],
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },

  containerInput: {
    marginBottom: 20
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30
  },

  goBack: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: '600',
    color: colors.h1,
    alignSelf: 'center',
    opacity: 0.8,
    textAlign: 'center'
  },

  message: {
    fontSize: 23,
    fontWeight: '600',
    color: colors.h1,
    textAlign: 'center'
  },

  messageEmail: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
    color: colors.h2,
    textAlign: 'center'
  },

  errorMessage: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: colors.danger,
    textAlign: 'center'
  },

  label: {
    marginTop: 15,
    marginBottom: -10,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '500',
    color: colors.h2
  },

  button: {
    height: 35,
    width: 90,
    backgroundColor: colors.blue,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    color: colors['light-secondary'],
    fontWeight: 'bold',
    fontSize: 16
  },

  avatar: {
    width: 180,
    height: 180,
    borderRadius: 180,
    borderWidth: 3,
    borderColor: colors.h2,
    alignSelf: 'center',
    marginTop: 20
  },

  avatarText: {
    color: colors.h2,
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
    textDecorationLine: 'underline',
    alignSelf: 'center'
  }
})
