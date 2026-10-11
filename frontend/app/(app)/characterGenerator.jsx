import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";

import { CLASES_DISPONIBLES } from "../../data/classes";
import { REINOS } from "../../data/kingdoms";
import { RACE } from "../../data/race";

const API_URL = process.env.EXPO_PUBLIC_API;


export default function Character() {
    const [nickname, setNickname] = useState("");
    const [rare, setRare] = useState("");
    const [classes, setClasses] = useState("");
    const [kingdom, setKingdom] = useState("");
    const [race, setRace] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [CharacterExists, setCharacterExists] = useState(false);

    useEffect(() => {
        loadCharacter();
    }, []);

  const loadCharacter = async () => {
    try {
      if (!API_URL) {
        throw new Error("Falta configurar EXPO_PUBLIC_API.");
      }

      const token = await SecureStore.getItemAsync("access_token");

      if (!token) {
        Alert.alert(
          "Sesión no encontrada",
          "Inicia sesión para cargar tu personaje."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/api/avatar/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Datos del avatar:", data);

      if (response.status === 404) {
        setCharacterExists(false);
        setNickname("");
        setRare("");
        setClasses("");
        setKingdom("");
        setRace("");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.error || "No se pudo cargar el personaje."
        );
      }

      setNickname(data.nickname ?? "");
      setRare(data.rare ?? "");
      setClasses(data.classes ?? "");
      setKingdom(data.kingdom ?? "");
      setRace(data.race ?? "");
      setCharacterExists(true);
    } catch (error) {
      console.log("Error al cargar personaje:", error);
      Alert.alert(
        "Error",
        error.message || "No se pudo conectar con el servidor."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCharacter = async () => {
    if (!nickname.trim() || !classes.trim() || !kingdom.trim() || !race.trim()) {
      Alert.alert(
        "Campos incompletos",
        "Completa el nombre, raza, la clase y el reino."
      );
      return;
    }

    try {
      if (!API_URL) {
        throw new Error("Falta configurar EXPO_PUBLIC_API.");
      }

      setSaving(true);

      const token = await SecureStore.getItemAsync("access_token");

      if (!token) {
        Alert.alert(
          "Sesión no encontrada",
          "Inicia sesión nuevamente."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/api/avatar/`,
        {
          method: CharacterExists ? "PATCH" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname: nickname.trim(),
            classes: classes.trim(),
            kingdom: kingdom.trim(),
            race: race.trim(),
          }),
        });
        const data = await response.json();

      if (!response.ok) {
        const message = Object.entries(data)
          .map(([field, errors]) => {
            const detail = Array.isArray(errors)
              ? errors.join(", ")
              : String(errors);
            return `${field}: ${detail}`;
          })
          .join("\n");

        throw new Error(
          message || "No se pudo guardar el personaje."
        );
      }

      setNickname(data.nickname ?? nickname);
      setRare(data.rare ?? rare);
      setClasses(data.classes ?? classes);
      setKingdom(data.kingdom ?? kingdom);
      setRace(data.race ?? race);
      setCharacterExists(true);

      if (!CharacterExists) {
        Alert.alert(
            "¡Personaje creado!",
            "Tu personaje está listo.",
            [
                {
                text: "Continuar",
                onPress: () => {router.replace("/home")},
                },
            ],
            { cancelable: false }
        );
      } else {
        Alert.alert(
            "Personaje actualizado",
            "Tus datos se guardaron correctamente."
        );
      }
    } catch (error) {
      console.log("Error al guardar personaje:", error);
      Alert.alert(
        "Error al guardar",
        error.message || "Comprueba tu conexión con el servidor."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#a1068c" />
        <Text style={styles.loadingText}>
          Cargando tu personaje...
        </Text>
        <StatusBar style="auto" />
      </View>
    );
  }

    return (
        <View style={styles.container}>
            <View style={styles.formCard}>
                <Text style={styles.title}>Crea tu personaje</Text>
                
                <Text style={styles.label}>Apodo:</Text>
                <TextInput style={styles.input}
                    placeholder="Nickname"
                    value={nickname}
                    onChangeText={setNickname}
                    editable={!saving}
                    maxLength={50}
                />
                
                <Text style={styles.label}>Clase:</Text>
                <Picker 
                    selectedValue={classes}
                    onValueChange={(value) => setClasses(value)}
                    enabled={!saving}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecciona una clase" value="" />
                    {CLASES_DISPONIBLES.map((item) =>(
                        <Picker.Item key={item.value} label={item.label} value={item.value}/>
                    ))}
                </Picker>

                <Text style={styles.label}>Reino:</Text>
                  <Picker
                    selectedValue={kingdom}
                    onValueChange={(value) => setKingdom(value)}
                    enabled={!saving}
                    style={styles.picker}
                    >
                    <Picker.Item label="Selecciona tu reino" value="" />
                    {REINOS.map((item) => (
                        <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                        />
                    ))}
                    </Picker>
                 <Text style={styles.label}>Raza:</Text>
                  <Picker
                    selectedValue={race}
                    onValueChange={(value) => setRace(value)}
                    enabled={!saving}
                    style={styles.picker}
                    >
                    <Picker.Item label="Selecciona una raza" value="" />
                    {RACE.map((item) => (
                        <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                        />
                    ))}
                    </Picker>
                <Pressable style={[styles.button, saving && styles.buttonDisabled]} onPress={handleCreateCharacter} disabled={saving}>
                    <Text style={styles.buttonText}>{saving ? "guardando..." : "Guardar personaje"}</Text>
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
        justifyContent: 'center',
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
    picker: {
        width:"100%",
        marginBottom: 15,
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
    buttonDisabled: {
        opacity: 0.6,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
    },
});