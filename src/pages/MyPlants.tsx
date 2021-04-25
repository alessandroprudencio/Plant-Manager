import AsyncStorage from '@react-native-async-storage/async-storage'
import { format, formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import * as Notifications from 'expo-notifications';
import { View, StyleSheet, Text, FlatList } from 'react-native'
import Header from '../components/Header'
import Load from '../components/Load'
import PlantCardSecondary from '../components/PlantCardSecondary'
import Tip from '../components/Tip'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { StoragePlantProps, PlantProps } from '../types/PlantTypes'

export default function MyPlants() {

    const [plants, setPlants] = useState<PlantProps[]>([])
    const [loading, setLoanding] = useState(true)
    const [nextWaterd, setNextWaterd] = useState<string>()

    async function loadPlants() {
        try {
            const data = await AsyncStorage.getItem('@plantmanager:plants')
            const plants = data ? JSON.parse(data) as StoragePlantProps : {}

            const plantsSorted = Object
                .keys(plants)
                .map(plant => {
                    return {
                        ...plants[plant].data,
                        hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
                    }
                })
                .sort((a, b) =>
                    Math.floor(
                        new Date(a.dateTimeNotification).getTime() / 1000 -
                        Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
                    )
                )

            const nextTime = formatDistance(
                new Date(plantsSorted[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            )

            setNextWaterd(`Regue sua ${plantsSorted[0].name} a ${nextTime}.`)
            setPlants(plantsSorted)
            setLoanding(false)
        } catch (error) {
            return Alert.alert('Nâo foi possivel buscar suas plantas.')

        }
    }

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja mesmo remover a planta ${plant.name} ?`, [
            {
                text: 'Não 🙏🏻',
                style: 'cancel'
            },
            {
                text: 'Sim 😢',
                onPress: async () => {
                    try {
                        const data = await AsyncStorage.getItem('@plantmanager:plants')

                        const plants = data ? JSON.parse(data) as StoragePlantProps : {}

                        await Notifications.cancelScheduledNotificationAsync(plants[plant.id].notificationId)

                        delete plants[plant.id]

                        await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants))

                        setPlants(oldValues => oldValues.filter((item) => item.id !== plant.id))

                    } catch (error) {
                        console.log(error)
                        Alert.alert('Não foi possivel remover! 😢')
                    }
                }
            }
        ])
    }


    useEffect(() => {
        loadPlants()
    }, [])

    if (loading) return <Load />

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.tipContainer}>
                <Tip water_tips={nextWaterd || ''} />
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Proximas regadas
                </Text>
                <FlatList
                    data={plants}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => {
                        return (
                            <PlantCardSecondary handleRemove={() => handleRemove(item)} data={item} />
                        )
                    }
                    }
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    tipContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})

