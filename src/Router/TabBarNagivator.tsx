import HomeStackScreens from "./Stacks/HomeStackScreens";
import FavoritesStack from "./Stacks/FavoritesStackScreens";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabBarNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Currency" component={HomeStackScreens}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name="money" size={24} color="green" />
                    )
                }}
            />
            <Tab.Screen
                name="Favorites" component={FavoritesStack}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name="heart" size={24} color="red" />
                    )
                }}
            />
        </Tab.Navigator>
    );
}