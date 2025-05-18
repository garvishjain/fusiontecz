import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState({});
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.apis.guru/v2/list.json')
      .then(response => {
        setData(response.data);
        setFilteredKeys(Object.keys(response.data));
      })
      .catch(() => alert('Failed to fetch data.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const lower = text.toLowerCase();
    const filtered = Object.keys(data).filter(key => key.toLowerCase().includes(lower));
    setFilteredKeys(filtered);
  };

  const renderItem = ({ item }) => {
    const api = data[item];
    const version = Object.keys(api.versions)[0];
    const info = api.versions[version].info;

    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Details', { apiId: item, apiData: api })}>
        <Text style={styles.title}>{item}</Text>
        <Text>{info.description || 'No description available.'}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search API's..."
        value={search}
        onChangeText={handleSearch}
        style={styles.search}
      />
      <FlatList
        data={filteredKeys}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No results found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  search: {
    borderColor: '#aaa', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginBottom: 10,
  },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 20, fontWeight: 'bold' },
});
