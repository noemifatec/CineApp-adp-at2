import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Catálogo de Filmes' }} />
      <Stack.Screen name="details/[id]" options={{ title: 'Detalhes do Filme' }} />
    </Stack>
  );
}
