import React, { useState } from 'react'
import { View, Alert, StyleSheet, ScrollView, Platform, TouchableOpacity, Text } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { SvgFromUri } from 'react-native-svg'
import * as Notifications from 'expo-notifications';
import Button from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { RouteStack } from '../types/RouteTypes'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns'
import { PlantProps, StoragePlantProps } from '../types/PlantTypes'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tip from '../components/Tip'
import * as Permissions from 'expo-notifications'

interface Params {
    plant: PlantProps
}

export default function PlantSave({ route, navigation }: RouteStack<"PlantSave">) {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showDate, setShowDate] = useState(Platform.OS === 'ios')

    const { plant } = route.params as Params

    function handleChangeDate(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDate(oldValue => !oldValue)
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDate(new Date())
            return Alert.alert('Escolha um horario maior que o atual! ⏰')
        }

        if (dateTime)
            setSelectedDate(dateTime)
    }
    function handleOpenDateTimeAndroid() {
        setShowDate(oldState => !oldState)
    }

    async function handleSave() {
        try {

            const { status } = await Permissions.getPermissionsAsync()

            if (status !== 'granted') {
                alert('Ei! Você não ativou as permissões selecionadas. 😞');
            }

            const nextTime = new Date(selectedDate)
            const now = new Date()

            const { times, repeat_every } = plant.frequency
            if (repeat_every === 'week') {
                const interval = Math.trunc(7 / times)
                nextTime.setDate(now.getDate() + interval)
            }
            else {
                nextTime.setDate(nextTime.getDate() + 1)
            }

            const seconds = Math.abs(
                Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
            )

            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Heeey, 🌱',
                    body: `Está na hora de cuidar da sua ${plant.name}`,
                    sound: true,
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                    data: {
                        plant
                    }
                },
                trigger: {
                    seconds: seconds < 60 ? 60 : seconds,
                    repeats: true
                }
            })

            const data = await AsyncStorage.getItem('@plantmanager:plants')
            const oldPlants = data ? JSON.parse(data) as StoragePlantProps : {}

            const newPlant = {
                [plant. id]: {
                    data: {
                        ...plant,
                        dateTimeNotification: selectedDate
                    },
                    notificationId
                }
            }

            await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify({ ...newPlant, ...oldPlants }))

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subTitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants'
            })

        } catch (error) {
            console.log('error=>', error)
            return Alert.alert('Nâo foi possivel salvar planta.')
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri uri={plant.photo} height={150} width={150} />
                    <Text style={styles.plantName}>{plant.name}</Text>
                    <Text style={styles.plantAbout}>{plant.about} </Text>
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Tip water_tips={plant.water_tips} />
                    </View>
                    <Text style={styles.alertLabel}>
                        Ecolha o melhor horário para ser lembrado:
                </Text>

                    {showDate &&
                        <DateTimePicker
                            style={styles.date}
                            value={selectedDate}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeDate} />
                    }
                    {
                        Platform.OS === 'android' &&
                        <TouchableOpacity
                            style={styles.dateTimePickerButton}
                            onPress={handleOpenDateTimeAndroid}
                        >
                            <Text style={styles.dateTimePickerText}>
                                {`Mudar ${format(selectedDate, 'HH:mm')}`}
                            </Text>
                        </TouchableOpacity>
                    }
                    <Button title="Cadastrar planta" onPress={handleSave}></Button>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        position: 'relative',
        bottom: 70,
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 13,
        marginBottom: 5
    },
    date: {
        height: 120
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,

    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
})