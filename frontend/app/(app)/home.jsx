import { View, Text, Button, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../src/context/AuthContext';

export default function Home() {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la app!</Text>
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
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
});