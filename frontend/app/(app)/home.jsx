import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../src/context/AuthContext';

const API_URL = process.env.EXPO_PUBLIC_API;

export default function Home() {
  const { token, logout } = useContext(AuthContext);

  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!token) {
        setError('No se encontró una sesión activa.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/avatar/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || data.detail || 'No se pudo cargar el personaje.'
          );
        }

        setAvatar(data);
      } catch (err) {
        setError(err.message || 'Error al conectar con el servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvatar();
  }, [token]);

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Cargando personaje...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a Redgeon!</Text>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : avatar ? (
        <View style={styles.avatarInfo}>
          <Text style={styles.subtitle}>Tu personaje</Text>

          {Object.entries(avatar).map(([key, value]) => {
            if (
              value === null ||
              typeof value === 'object' ||
              key === 'id' ||
              key === 'user'
            ) {
              return null;
            }

            return (
              <Text style={styles.info} key={key}>
                {key}: {String(value)}
              </Text>
            );
          })}
        </View>
      ) : null}

      <Button
        title="Cerrar sesión"
        onPress={handleLogout}
        color="#ffc9c9"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  avatarInfo: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});