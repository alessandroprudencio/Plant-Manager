import React from 'react'

import { View, Text, Image, StyleSheet } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'


interface TipProps {
    water_tips:string
}

export default function Tip({ water_tips }: TipProps) {
    return (
        <>
            <Image style={styles.tipImage} source={require('../assets/waterdrop.png')}></Image>
            <Text style={styles.tipText}>{water_tips}</Text>
        </>
    )
}
const styles = StyleSheet.create({

    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
})