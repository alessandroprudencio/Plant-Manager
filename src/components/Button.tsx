import React from 'react'
import {  Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonProps  extends  TouchableOpacityProps{
    title: string,
    disabled?: boolean
}

export default function Button ({disabled = false, title, ...props } :  ButtonProps) {
    return (
        <TouchableOpacity disabled={ disabled } style={disabled ?styles.buttonDisable :  styles.container }  {...props} >
        <Text style={styles.buttonText}>
            { title }
        </Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.green,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:16,
        height: 56,
        width:'100%'
    },
    buttonText:{
        color:colors.white,
        fontSize:17,
        fontFamily:fonts.heading
    },
    buttonDisable:{
        backgroundColor:colors.green,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:16,
        height: 56,
        opacity:0.5,
        width:'100%'

    }

})