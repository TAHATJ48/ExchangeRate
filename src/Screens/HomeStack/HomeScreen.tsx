import { View, Switch, StyleSheet, Button, Text, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React from "react";
import { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function HomeScreen() {
    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
        }
    }

    const retrieveData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            console.log(result)
        } catch (error) {
            console.error(error)
        }
    };
    const [isLoading, setLoading] = useState(true);
    const url = 'https://api.apilayer.com/exchangerates_data/symbols?apikey=sTfnMd0LMjgQR0LXYlQ1cOad6cGUNPsZ'
    const [allCurrencies, setAllCurrencies] = useState([])
    let navigation = useNavigation();

    const Currencies = async (url: string) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setAllCurrencies(json.symbols);
            retrieveData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
    }
    useEffect(() => {
        Currencies(url)
    }, [])
    return (
        <ScrollView>
            {
                Object.entries(allCurrencies).map(([key, value]) => (
                    <Text key={key}>
                        {key}: {value}
                        {"\n"}
                        <Button title="See Rates" onPress={() => {
                            navigation.navigate('CurrencyRates', {
                                title: value,
                                base: key
                            });
                        }} />
                        <Button title="Add To Favorites" onPress={() => storeData(key,value)}   />
                    </Text>

                ))}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    headline: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        backgroundColor: 'yellow',
    },

});