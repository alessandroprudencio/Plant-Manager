import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Header() {

    const [user, setUser] = useState<string>()

    async function getUser() {
        const nameUser = await AsyncStorage.getItem('@plantmanager:user')
        setUser(nameUser || '')
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.hello} >Ola,</Text>
                <Text style={styles.userName} >{user}</Text>
            </View>
            <Image
                style={styles.image}
                source={require('../assets/user.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 50,
    },
    userName: {
        fontFamily: fonts.heading,
        fontSize: 32,
        color: colors.heading,
        lineHeight: 36
    },
    hello: {
        fontFamily: fonts.text,
        fontSize: 32,
        color: colors.heading,
        lineHeight: 36
    }
})