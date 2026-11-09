import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MovieDetailScreen() {
  // Captura o parâmetro [id] passado pelo router.push
  const { id } = useLocalSearchParams();
  
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulação de carregamento do item específico
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID do Filme Selecionado:</Text>
      <Text style={styles.value}>{id}</Text>
      <Text style={styles.description}>
        Aqui você pode realizar uma nova chamada de API passando o ID ({id}) para exibir todos os detalhes do item selecionado.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#888',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
});