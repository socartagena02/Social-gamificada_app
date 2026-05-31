import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

export default function Character() {
    const [nickname, setNickname] = useState('');
    const [rare, setRare] = useState('');
    const [classes, setClasses] = useState('');
    const [kingdom, setKingdom] = useState('');

    const handleCreateCharacter = () => {
        console.log(nickname, rare, classes, kingdom);
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.formCard}>
                <Text style={styles.title}>Crea tu personaje</Text>
                
                <Text style={styles.label}>Nombre:</Text>
                <TextInput style={styles.input}
                    placeholder="Apodo"
                    value={nickname}
                    onChangeText={setNickname}
                />
                
                <Text style={styles.label}>Rareza:</Text>
                <TextInput style={styles.input}
                    placeholder="Rareza"
                    value={rare}
                    onChangeText={setRare}
                />
                
                <Text style={styles.label}>Clase:</Text>
                <TextInput style={styles.input}
                    placeholder="Clase"
                    value={classes}
                    onChangeText={setClasses}
                />
                
                <Text style={styles.label}>Reino:</Text>
                <TextInput style={styles.input}
                    placeholder="Reino"
                    value={kingdom}
                    onChangeText={setKingdom}
                />
                
                {/* 2. Reemplaza el Button por un Pressable estilizado */}
                <Pressable style={styles.button} onPress={handleCreateCharacter}>
                    <Text style={styles.buttonText}>Crear</Text>
                </Pressable>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCC5AD',
        alignItems: 'center',
        justify: 'center',
        padding: 40,
    },
    formCard: {
        width: '100%',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        backgroundColor: '#FFF',
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontSize: 14,
    },

    button: {
        backgroundColor: '#2196F3', 
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});