import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBarNavigator from "./src/Router/TabBarNagivator";

import ExempleFullScreenModal from './src/Screens/Modals/ExempleFullScreenModal';

const RootStack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }} >
                
                <RootStack.Group>
                    <RootStack.Screen name="TabBar" component={TabBarNavigator} />
                </RootStack.Group>

                <RootStack.Group screenOptions={{ presentation: "fullScreenModal" }}>
                    <RootStack.Screen name="ExempleFullScreenModal" component={ExempleFullScreenModal} />
                </RootStack.Group>

            </RootStack.Navigator>
        </NavigationContainer>
    );
}