import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonEnvironmentProps extends RectButtonProps {
    title: string,
    active?: boolean
}

export default function ButtonEnvironment({
    title,
    active = false,
    ...props
}: ButtonEnvironmentProps) {
    return (
        <RectButton
            style={[styles.container, active && styles.containerActive]}
            {...props} >
            <Text style={[styles.text, active && styles.textActive]}>
                {title}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.shape,
        height:40,
        width:76,
        marginHorizontal:5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12
    },
    containerActive:{
        backgroundColor:colors.green_light,
    },
    textActive:{
        color:colors.green_dark,
        fontFamily:fonts.heading
    },
    text:{
        color:colors.heading,
        fontFamily:fonts.text
    }
})