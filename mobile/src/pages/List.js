import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, Image, Alert, Text, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List({ navigation }){
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.111:3333', {
                query: { user_id }
            })
        socket.on('booking_response', booking => {
            Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA': 'REJEITADA'}`)
        })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);
    function BookList(){
        navigation.navigate('Books');
    }
    async function logOut(){
        await AsyncStorage.setItem('user', '');
        navigation.navigate('Login');
    }

    return (
    <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.logo}/>
        <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech}/>) }
        <TouchableOpacity style={styles.buttonPrimary} onPress={BookList}>
            <Text style={styles.buttonText}>Suas reservas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={logOut}>
            <Text style={styles.buttonText}>LogOut</Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    logo:{
        height:32,
        resizeMode: "contain",
        alignSelf:'center',
        marginTop:30,
        marginBottom: 10
    },
    button:{
        height:42,
        backgroundColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPrimary: {
        backgroundColor: '#f05a5b',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height:42,
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});