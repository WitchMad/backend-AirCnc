import React from 'react';
import { SafeAreaView, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import logo from '../assets/logo.png';
import BooksList from '../components/BooksList';

export default function List({ navigation }){

    async function listaSpots(){
        navigation.navigate('List');
    }

    return (
    <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.logo}/>
        <ScrollView>
        <BooksList/>
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={listaSpots}>
            <Text style={styles.buttonText}>Lista de spots</Text>
        </TouchableOpacity>
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
        marginBottom: 10,
    },
    button:{
        height:42,
        backgroundColor: '#f05a5b',
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