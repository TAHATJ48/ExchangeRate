import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../Screens/HomeStack/HomeScreen';
import Rates from '../../Screens/HomeStack/Rates';

import React from 'react';
const HomeStack = createNativeStackNavigator();

export default function HomeStackScreens() {
    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name="All Currencies" component={HomeScreen} />
            <HomeStack.Screen name="CurrencyRates" component={Rates} />
        </HomeStack.Navigator>
    );
}