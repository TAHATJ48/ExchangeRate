import { View, Button, StyleSheet, Text, ScrollView } from "react-native"
import React from "react"
import { useEffect, useState } from 'react'
import { AsyncStorageStatic } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function FavoriteRates(route) {
    //Three Weeks Ago
    function getThreeWeeksAgo() {
        var today = new Date();
        var last3Week = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 21);
        return last3Week;
    }
    var last3Week = getThreeWeeksAgo();
    var last3WeekMonth = last3Week.getMonth() + 1;
    var last3WeekDay = last3Week.getDate();
    var last3WeekYear = last3Week.getFullYear();
    var last3WeekDisplay = ("0000" + last3WeekYear.toString()).slice(-4) + "-" + ("00" + last3WeekMonth.toString()).slice(-2) + "-" + ("00" + last3WeekDay.toString()).slice(-2);

    //Two Weeks Ago

    function getTwoWeeksAgo() {
        var today = new Date();
        var last2Week = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14);
        return last2Week;
    }
    var last2Week = getTwoWeeksAgo();
    var last2WeekMonth = last2Week.getMonth() + 1;
    var last2WeekDay = last2Week.getDate();
    var last2WeekYear = last2Week.getFullYear();

    var last2WeekDisplay = ("0000" + last2WeekYear.toString()).slice(-4) + "-" + ("00" + last2WeekMonth.toString()).slice(-2) + "-" + ("00" + last2WeekDay.toString()).slice(-2);

    //Last Week
    function getLastWeek() {
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        return lastWeek;
    }
    var lastWeek = getLastWeek();
    var lastWeekMonth = lastWeek.getMonth() + 1;
    var lastWeekDay = lastWeek.getDate();
    var lastWeekYear = lastWeek.getFullYear();

    var lastWeekDisplay = ("0000" + lastWeekYear.toString()).slice(-4) + "-" + ("00" + lastWeekMonth.toString()).slice(-2) + "-" + ("00" + lastWeekDay.toString()).slice(-2);

    const date = new Date().getDate()
    const url = `https://api.apilayer.com/exchangerates_data/latest?apikey=sTfnMd0LMjgQR0LXYlQ1cOad6cGUNPsZ&symbols=EUR,GBP,USD,JPY,CNY,CAD,AUD,MAD&base=${route.route.params.base}`
    const lastweekurl = `https://api.apilayer.com/exchangerates_data/${lastWeekDisplay}?symbols=EUR,GBP,USD,JPY,CNY,CAD,AUD,MAD&base=${route.route.params.base}&apikey=sTfnMd0LMjgQR0LXYlQ1cOad6cGUNPsZ`
    const last2weekurl = `https://api.apilayer.com/exchangerates_data/${last2WeekDisplay}?symbols=EUR,GBP,USD,JPY,CNY,CAD,AUD,MAD&base=${route.route.params.base}&apikey=sTfnMd0LMjgQR0LXYlQ1cOad6cGUNPsZ`
    const last3weekurl = `https://api.apilayer.com/exchangerates_data/${last3WeekDisplay}?symbols=EUR,GBP,USD,JPY,CNY,CAD,AUD,MAD&base=${route.route.params.base}&apikey=sTfnMd0LMjgQR0LXYlQ1cOad6cGUNPsZ`

    const [allRates, setAllRates] = useState([])
    const [allRatesWeek1, setAllRatesWeek1] = useState([])
    const [allRatesWeek2, setAllRatesWeek2] = useState([])
    const [allRatesWeek3, setAllRatesWeek3] = useState([])

    const Rates = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setAllRates(json.rates);
        } catch (error) {
            console.error(error);
        }
    }
    const History = async () => {
        try {
            const response = await fetch(lastweekurl);
            const json = await response.json();
            setAllRatesWeek1(json.rates);
            const response2 = await fetch(last2weekurl);
            const json2 = await response2.json();
            setAllRatesWeek2(json2.rates);
            const response3 = await fetch(last3weekurl);
            const json3 = await response3.json();
            setAllRatesWeek3(json3.rates);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        Rates(),
            History()
    }, [])
    return (
        <ScrollView>
            <Text style={styles.headline}> {route.route.params.base}</Text>
            <Text style={styles.headline}> Exchange Rates</Text>
            {Object.entries(allRates).map(([key, value]) => (
                <Text key={key}>
                    {key}: {value}
                </Text>))}
            <Text style={styles.headline}> History</Text>
            <Text> 1 Week Ago</Text>
            {Object.entries(allRatesWeek1).map(([key, value]) => (
                <Text key={key}>
                    {key}: {value}
                </Text>))}
            <Text> 2 Weeks Ago</Text>
            {Object.entries(allRatesWeek2).map(([key, value]) => (
                <Text key={key}>
                    {key}: {value}
                </Text>))}
            <Text> 3 Weeks Ago</Text>
            {Object.entries(allRatesWeek3).map(([key, value]) => (
                <Text key={key}>
                    {key}: {value}
                </Text>))}
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
