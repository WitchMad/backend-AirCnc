import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import api from '../services/api';

export default function BooksList(){
    const [books, setBooks] = useState([]);
    useEffect(() => {
        async function loadBooks(){
            const user_id = await AsyncStorage.getItem('user');
            const response = await api.get('/bookings', {
                headers: { 
                    user_id
                 }
            })

            setBooks(response.data);
        }
        loadBooks();
    }, []);

    return (
    <View style={styles.container}>
        <Text style={styles.title}>Suas reservas anteriores</Text>
            {books.map(book => (
                <View key={book.spot._id} style={styles.listItem}>
                <Image style={styles.thumbnail} source={{ uri: book.spot.thumbnail_url }}/>
                <Text style={styles.company}>{book.spot.company}</Text>
                <Text style={styles.day}>{`Marcado: ${book.date}`}</Text>
                <Text style={styles.status}>{`SITUAÇÃO: ${book.approved == true ? 'ACEITA' : (book.approved == false ? 'RECUSADA' : 'AGUARDANDO') }`}</Text>
            </View>
            ))}
    </View>
        );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize: 20,
        color: '#444',
        paddingHorizontal:20,
        marginBottom: 15,
    },
    listItem:{
        marginBottom: 15,
    },
    thumbnail:{
        width:300,
        height:180,
        resizeMode: 'cover',
        borderRadius: 2
    },
    company:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    day:{
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    status:{
        fontSize:16,
        fontWeight: 'bold',
        marginTop:10,
        marginBottom:20,
    }
});