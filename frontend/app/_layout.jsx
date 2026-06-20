import { AuthProvider, AuthContext } from '../src/context/AuthContext';
import { useContext } from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { isLoading, isSignedIn } = useContext(AuthContext);

  if (isLoading) {
    return null; 
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isSignedIn ? (
        <Stack.Screen name="(auth)" />
      ) : (
        <Stack.Screen name="(app)" />
      )}
    </Stack>
  );
}