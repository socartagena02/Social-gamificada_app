import { Tabs } from 'expo-router';

export default function AppLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: 'Misiones' }} />
      <Tabs.Screen name="character" options={{ title: 'Personaje' }} />
      <Tabs.Screen name="party" options={{ title: 'Party' }} />
    </Tabs>
  );
}