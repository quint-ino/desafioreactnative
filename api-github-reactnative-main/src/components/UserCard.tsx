import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface UserCardProps {
  user: {
    avatar_url: string;
    name: string;
    login: string;
    location: string;
  };
  onPress: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.login}>{user.login}</Text>
      <Text style={styles.location}>{user.location}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  login: {
    fontSize: 16,
    color: '#555',
  },
  location: {
    fontSize: 14,
    color: '#777',
  },
});

export default UserCard;
