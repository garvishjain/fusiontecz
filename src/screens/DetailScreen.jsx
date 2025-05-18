import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Linking } from 'react-native';

export default function DetailScreen({ route }) {
  const { apiData } = route.params;
  const version = Object.keys(apiData.versions)[0];
  const api = apiData.versions[version];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{api.info.title}</Text>
      <Text style={styles.text}>{api.info.description || 'No description available.'}</Text>

      <Text style={styles.subtitle}>Base URL:</Text>
      <Text style={styles.text}>{api.servers?.[0]?.url || 'N/A'}</Text>

      <Text style={styles.subtitle}>Contact:</Text>
      <Text style={styles.text}>{api.info.contact?.name || 'N/A'}</Text>
      <Text style={styles.text}>{api.info.contact?.email || ''}</Text>

      <Button title="Visit Docs" onPress={() => Linking.openURL(api.swaggerUrl)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontWeight: 'bold', marginTop: 10 },
  text: { marginBottom: 5 },
});

