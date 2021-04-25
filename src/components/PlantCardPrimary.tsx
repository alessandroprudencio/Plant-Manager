import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { SvgFromUri  } from 'react-native-svg';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface PlantProps extends RectButtonProps {
    data: {
        name: string,
        photo: string
    }
}
export default function PlantCardPrimary({ data, ...props }: PlantProps) {
    return (
        <RectButton
            style={styles.container}
            {...props} >
             <SvgFromUri width={73} height={89}  style={styles.photo} uri={data.photo} />
            <Text style={styles.text}>
                {data.name}
            </Text>
        </RectButton>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10
    },
    text: {
        fontFamily: fonts.heading,
        color: colors.green_dark,
        marginVertical: 16
    },
    photo: {
        width: 73,
        height: 73
    }
})