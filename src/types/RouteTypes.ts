import { RouteProp } from "@react-navigation/core"
import { StackNavigationProp } from "@react-navigation/stack"


import { PlantProps } from './PlantTypes'
import { ConfirmationProps } from './ConfirmationTypes'

export type RouteTypes = {
    Welcome: undefined,
    UserIdentification: undefined,
    Confirmation: ConfirmationProps,
    PlantSelect: undefined,
    PlantSave: {
        plant: PlantProps
    },
    MyPlants: undefined
}

export type RouteStack<T extends keyof RouteTypes> = {
    navigation: StackNavigationProp<RouteTypes, T>
    route: RouteProp<RouteTypes, T>
}