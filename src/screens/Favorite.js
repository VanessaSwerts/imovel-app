import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import api from '../services/api'

export default function Favorite() {
	const navigation = useNavigation()

	const [favorites, setFavorites] = useState([])

	const getFavorites = async () => {
		const token = await AsyncStorage.getItem("user-token")
		if (!token) {
			navigation.navigate("SignIn", { backPath: "Favoritos" })
			return
		}

		const config = {
			headers: {
				"Authorization": "Bearer " + token
			}
		}

		api.get(`/user/favorites`, config)
			.then((res) => {
				setFavorites(res.data)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	useEffect(() => {
		getFavorites()
	}, [])

	console.log(favorites)

	return (
		<KeyboardAvoidingView>
			<Text>Its Favorite Screen</Text>
		</KeyboardAvoidingView>
	)
}