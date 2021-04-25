import React, { ReactPropTypes } from 'react'
import {
    SafeAreaView,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    View,
} from 'react-native'

import { Feather } from '@expo/vector-icons'

import watering from '../assets/watering.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { RouteStack } from '../types/RouteTypes'

export default function Welcome({ navigation }: RouteStack<"Welcome">) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Gerencie  {'\n'}
                suas plantas de  {'\n'}
                forma fácil
            </Text>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={watering} />
                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.
                Nós cuidamos de lembrar você {'\n'}
                sempre que precisar.
            </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("UserIdentification")}
                    style={styles.button}
                >
                    <Feather
                        name="chevron-right"
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title: {
        fontFamily: fonts.heading,
        lineHeight: 34,
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        color: colors.body_dark,
        fontStyle: 'normal',
        fontWeight: 'normal',
        paddingHorizontal: 20,
        textAlign: 'center',
        lineHeight: 25,
    },
    image: {
        height: Dimensions.get('window').width * .7,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
        backgroundColor: colors.green
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 32
    },

})