import React, { useEffect } from 'react'

import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Load() {

    return (
        <View style={styles.animationContainer}>
            <LottieView
                style={styles.animation}
                autoPlay
                loop
                source={require('../assets/load.json')}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    animation: {
        width: 200,
        height: 200,
        backgroundColor: 'transparent',
    }
});