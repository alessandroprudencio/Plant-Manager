import * as React from 'react';
import { Platform, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import PlantSelect from '../pages/PlantSelect';
import { MaterialIcons } from '@expo/vector-icons';
import MyPlants from '../pages/MyPlants';

const AppTab = createBottomTabNavigator();

const TabRoutes = () => {
    return (
        <AppTab.Navigator tabBarOptions={{
            activeTintColor: colors.green,
            inactiveTintColor: colors.heading,
            labelPosition: 'beside-icon',
            style:{
                paddingVertical: Platform.OS==='ios' ?  20 : 0,
                height: 88
            }
        }}>
            <AppTab.Screen name="Nova Planta" component={PlantSelect} options={{
                tabBarIcon: ({ size, color }) => (
                    <MaterialIcons name="add-circle-outline" size={size} color={color} ></MaterialIcons>
                )
            }} />
              <AppTab.Screen name="Minhas Plantas" component={MyPlants} options={{
                tabBarIcon: ({ size, color }) => (
                    <MaterialIcons name="format-list-bulleted" size={size} color={color} ></MaterialIcons>
                )
            }} />

        </AppTab.Navigator>
    )
}

export default TabRoutes