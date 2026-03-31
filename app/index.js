import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button} from 'react-native';
import { Link } from "expo-router";


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handlelogin = () => {
    console.log(email, password);
  }

  return (
  <View style={styles.container}>
    <View style={styles.formCard}>
      <Text style={styles.title}>Inicie sesión</Text>
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        placeholder="hola@gmail.com"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Link href="/register" asChild>
        <Text style={styles.createAccount}>
            ¿No tienes cuenta? ¡Regístrate aquí!
        </Text>
      </Link>
      <Text style={styles.createAccount}>
        Resetear contraseña
      </Text>
      <Button title="Entrar" onPress={handlelogin} />
    </View>
    <StatusBar />
  </View>
);
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
});