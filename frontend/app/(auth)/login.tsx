import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, Button, Alert } from 'react-native';
import { Link, router } from "expo-router";
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Error:', 'completa email y contraseña.');
      return;
    }
    
    setLoading(true);
    try{
      const response = await fetch(`${API_URL}/api/login/`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      });
      const data = await response.json();
      
      if (response.ok){
        await SecureStore.setItemAsync('access_token', data.access);
        await SecureStore.setItemAsync('refresh_token', data.refresh);
        router.replace('/(app)/home');
      } else {
        Alert.alert('Error', data.error || 'Credenciales inválidas');
      }
    } catch (error){
      Alert.alert('Error', 'problemas de conexión con servidor');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>Inicio de sesión</Text>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput 
          placeholder="hola@gmail.com"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput 
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          editable={!loading}
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
        <Button title={loading ? "Entrando..." : "Entrar"} onPress={handleLogin} disabled={loading} />
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
  link: {
    marginBottom: 10
  }
});