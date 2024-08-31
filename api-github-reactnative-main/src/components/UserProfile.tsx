import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';

interface UserProfileProps {
  user: {
    avatar_url: string;
    name: string;
    login: string;
    location: string;
    id: number;
    followers: number;
    public_repos: number;
  };
  repositories: {
    id: number;
    name: string;
    language: string;
    description: string;
    created_at: string;
    pushed_at: string;
    html_url: string;
  }[];
}

const UserProfile: React.FC<UserProfileProps> = ({ user, repositories }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.login}>{user.login}</Text>
      <Text style={styles.location}>{user.location}</Text>
      <Text style={styles.id}>ID: {user.id}</Text>
      <Text style={styles.followers}>Followers: {user.followers}</Text>
      <Text style={styles.publicRepos}>Public Repos: {user.public_repos}</Text>
      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.html_url)} style={styles.repo}>
            <Text style={styles.repoName}>{item.name}</Text>
            <Text style={styles.repoLang}>Language: {item.language}</Text>
            <Text style={styles.repoDesc}>Description: {item.description}</Text>
            <Text style={styles.repoDates}>Created: {new Date(item.created_at).toLocaleDateString()}</Text>
            <Text style={styles.repoDates}>Last Push: {new Date(item.pushed_at).toLocaleDateString()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  login: {
    fontSize: 18,
    color: '#555',
  },
  location: {
    fontSize: 16,
    color: '#777',
  },
  id: {
    fontSize: 16,
    marginVertical: 5,
  },
  followers: {
    fontSize: 16,
    marginVertical: 5,
  },
  publicRepos: {
    fontSize: 16,
    marginVertical: 5,
  },
  repo: {
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  repoName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  repoLang: {
    fontSize: 16,
  },
  repoDesc: {
    fontSize: 14,
    color: '#555',
  },
  repoDates: {
    fontSize: 14,
    color: '#777',
  },
});

export default UserProfile;
