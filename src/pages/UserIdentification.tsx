import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, KeyboardAvoidingView, TextInput, Platform, Keyboard, Alert } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import Button from '../components/Button'
import { RouteStack } from '../types/RouteTypes'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function UserIdentification({ navigation }: RouteStack<"UserIdentification">) {

    const [isFocused, setIsFocused] = useState(false)
    const [name, setName] = useState<string>()

    function handleInputFocus() {
        setIsFocused(true)
    }

    function handleInputBlur() {
        setIsFocused(!!name)
    }

    function handleInputChange(value: string) {
        setName(value)
    }
    async function handleSubmit() {
        try {
            await AsyncStorage.setItem('@plantmanager:user', name!)
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subTitle: ' Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            })
        } catch (error) {
            Alert.alert(`Não foi possivel salvar seu nome.`)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {name ? '😀' : '🙂'}
                                </Text>
                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                chamar você?
                        </Text>
                                <TextInput
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                    onChangeText={text => handleInputChange(text)}
                                    placeholder="Digite um nome"
                                    style={[styles.input, (isFocused) && { borderColor: colors.green }]}
                                />
                                <View style={styles.footer}>
                                    <Button
                                        disabled={!!!name}
                                        onPress={handleSubmit}
                                        title="Confirmar" />
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        textAlign: 'center',
        lineHeight: 32,
        color: colors.heading,
        marginTop: 20
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        width: '100%',
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 40
    },
})