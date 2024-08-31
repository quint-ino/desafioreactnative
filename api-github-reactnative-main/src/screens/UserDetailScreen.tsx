import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Linking, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const UserDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { user } = route.params;
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${user.login}/repos`);
        setRepos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepos();
  }, [user.login]);

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image source={{ uri: user.avatar_url }} style={styles.profileImage} />
        <Text style={styles.profileName}>{user.name || 'No name provided'}</Text>
        <Text style={styles.profileDetail}>Login: {user.login}</Text>
        <Text style={styles.profileDetail}>Location: {user.location || 'No location provided'}</Text>
        <Text style={styles.profileDetail}>ID: {user.id}</Text>
        <Text style={styles.profileDetail}>Followers: {user.followers}</Text>
        <Text style={styles.profileDetail}>Public Repos: {user.public_repos}</Text>
      </View>

      <FlatList
        data={repos}
        renderItem={({ item }) => (
          <View style={styles.repositoryCard}>
            <TouchableOpacity onPress={() => Linking.openURL(item.html_url)}>
              <Text style={styles.repositoryName}>{item.name}</Text>
              <Text style={styles.repositoryDetail}>Language: {item.language || 'No language specified'}</Text>
              <Text style={styles.repositoryDetail}>Description: {item.description || 'No description'}</Text>
              <Text style={styles.repositoryDetail}>Created at: {new Date(item.created_at).toLocaleDateString()}</Text>
              <Text style={styles.repositoryDetail}>Last push: {new Date(item.pushed_at).toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  repositoryCard: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  repositoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  repositoryDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default UserDetailScreen;
