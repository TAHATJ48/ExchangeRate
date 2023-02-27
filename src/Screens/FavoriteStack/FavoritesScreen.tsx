import { View, Button, Text, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React from "react";
import { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function FavoritesScreen() {
    const [allCurrencies, setAllCurrencies] = useState()
    let navigation = useNavigation();

    const DeleteData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
        } catch (e) {
            // saving error
        }
    }
    const remove = async (key) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch (e) {
            // saving error
        }
    }
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getAllKeys()
            const result = await AsyncStorage.multiGet(jsonValue);
            console.log(result)
            setAllCurrencies(jsonValue)
            
        } catch (e) {
            // error reading value
        }
    }
    useEffect(() => {
        getData()}, [])
    return (
        <ScrollView>
            <Button title="Delete All" onPress={DeleteData} />
            <Button title="Refresh" onPress={getData} />
            {allCurrencies ? (
                <View>
                    {
                        allCurrencies.map((cley) => (
                            <Text key={cley}>
                                {cley}
                                
                                <Button title="Go to Details" onPress={() => {
                                    navigation.navigate('FavoriteRates', {
                                        base: cley
                                    });
                                }} />
                            </Text>


                        ))}
                </View>
            ) : (
                <Text>
                    No Favorites
                </Text>
            )}
    

        </ScrollView >
    );
}