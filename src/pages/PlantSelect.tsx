import React, { useEffect, useState } from 'react'

import { SafeAreaView, View, StyleSheet, Text, FlatList, Platform, StatusBar, ActivityIndicator } from 'react-native'
import ButtonEnvironment from '../components/ButtonEnvironment'
import Header from '../components/Header'
import Load from '../components/Load'
import PlantCardPrimary from '../components/PlantCardPrimary'
import api from '../services/api'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { PlantProps } from '../types/PlantTypes'
import { RouteStack } from '../types/RouteTypes'

interface EnvironmentsProps {
    title: string
    key: string
}

export default function PlantSelect({ navigation }: RouteStack<"PlantSelect">) {

    const [environments, setEnvironments] = useState<EnvironmentsProps[]>([])
    const [plants, setPlants] = useState<PlantProps[]>([])
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
    const [environmentSelected, setEnvironmentSelected] = useState('all')
    const [loading, setLoading] = useState(true)

    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)


    async function fetchEnvironments() {
        const { data } = await api.get('/plants_environments?_sort=title&_order=asc')
        setEnvironments(
            [
                {
                    title: 'Todos',
                    key: 'all'
                },
                ...data,
            ]
        )
    }

    async function fetchPlants() {
        const { data } = await api.get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

        if (!data)
            return setLoading(true)

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        } else {
            setPlants(data)
            setFilteredPlants(data)
        }
        setLoading(false)
        setLoadingMore(false)
    }

    function handleEnvironmentSelected(environment: string) {
        setEnvironmentSelected(environment)

        if (environment === 'all')
            return setFilteredPlants(plants)

        const filtered = plants.filter(plant => plant.environments.includes(environment))
        setFilteredPlants(filtered)
    }

    function handleFetchMore(distance: number) {
        if (distance < 1)
            return

        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fetchPlants()
    }

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate("PlantSave", { plant })
    }

    useEffect(() => {
        fetchPlants()
        fetchEnvironments()
    }, [])

    if (loading) return <Load />
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
            </View>
            <View>
                <FlatList
                    horizontal
                    keyExtractor={(item) => String(item.key)}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.buttonEnvironmentList}
                    data={environments}
                    renderItem={({ item }) =>
                        <ButtonEnvironment
                            onPress={() => handleEnvironmentSelected(item.key)}
                            active={environmentSelected === item.key}
                            title={item.title} />}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    data={filteredPlants}
                    renderItem={({ item }) =>
                        <PlantCardPrimary
                            onPress={() => handlePlantSelect(item)}
                            data={item}
                        />
                    }
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore
                            ? <ActivityIndicator color={colors.green} />
                            : <></>
                    }
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    header: {
        paddingHorizontal: 30
    },
    buttonEnvironmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 30,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        marginHorizontal: 30,
        justifyContent: 'center'
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    }

})