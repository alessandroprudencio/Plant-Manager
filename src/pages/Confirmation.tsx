import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

import Button from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { RouteStack } from '../types/RouteTypes'
import { ConfirmationProps } from '../types/ConfirmationTypes'

const emojis = {
    hug: '🤗',
    smile: '😀'
}

export default function Confirmation({ navigation, route }: RouteStack<"Confirmation">) {

    const { title, subTitle, buttonTitle, icon, nextScreen } = route.params as ConfirmationProps

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subTitle}
                </Text>
                <View style={styles.footer}>
                    <Button onPress={() => navigation.navigate(nextScreen)} title={buttonTitle} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30,
    },
    emoji: {
        fontSize: 96,
        textAlign: 'center',
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20
    }
})