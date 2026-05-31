import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, Button } from 'react-native';
import { Link, router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () =>{
    router.replace('/(app)/home');
  };
  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>Inicio de sesión</Text>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput placeholder="hola@gmail.com"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry  
        />

        <Link href="/(auth)/register" asChild>
          <Pressable>
            <Text style={styles.link}> ¿No tienes cuenta? ¡Regístrate aquí! </Text>
          </Pressable>
        </Link>
        <Link href="/(auth)/forgot-password">
          <Pressable>
            <Text style={styles.link}>Resetar contraseña</Text>
          </Pressable>
        </Link>
        <Button title="Entrar" onPress={handleLogin}/>
      </View>
      <StatusBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCC5AD',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
},

formCard: {
  width: '100%',
  backgroundColor: '#FFF',
  padding: 20,
  paddingTop: 20,
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

createAccount: {
  marginBottom: 10,
  fontSize: 14,
},

link: {
  marginBottom: 10
},

});