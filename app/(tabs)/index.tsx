import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { MovieCard } from '../../components/MovieCard';

interface Movie {
  id: string;
  title: string;
  year: string;
  genre: string;
  image: string;
  synopsis: string;
}

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('https://api.sampleapis.com/movies/animation');
      
      const formattedMovies: Movie[] = response.data.slice(0, 15).map((item: any) => ({
        id: String(item.id),
        title: item.title,
        year: String(item.year || 'N/A'),
        genre: item.genre || 'Animação',
        image: item.posterURL || 'https://via.placeholder.com/180x260',
        synopsis: item.synopsis || 'Sinopse não disponível para este filme no momento.',
      }));

      setMovies(formattedMovies);
    } catch (err) {
      setError('Falha ao carregar os filmes. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.infoText}>Carregando catálogo de filmes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar Novamente" onPress={fetchMovies} color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            year={item.year}
            genre={item.genre}
            onPress={() =>
              router.push({
                pathname: '/detalhes',
                params: {
                  id: item.id,
                  titulo: item.title,
                  imagem: item.image,
                  genero: item.genre,
                  ano: item.year,
                  sinopse: item.synopsis,
                },
              })
            }
          />
        )}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  infoText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d9534f',
    textAlign: 'center',
    marginBottom: 16,
  },
  listPadding: {
    paddingVertical: 12,
  },
});
