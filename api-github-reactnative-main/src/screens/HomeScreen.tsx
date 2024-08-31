import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const UserCard = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

const UserImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [recentSearches, setRecentSearches] = useState<any[]>([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);

      // Save to AsyncStorage
      let searches = await AsyncStorage.getItem('recentSearches');
      searches = searches ? JSON.parse(searches) : [];
      searches = [response.data, ...searches.filter((u: any) => u.login !== response.data.login)];
      await AsyncStorage.setItem('recentSearches', JSON.stringify(searches));
      setRecentSearches(searches);
    } catch (error) {
      console.error(error);
    }
  };

  const loadRecentSearches = async () => {
    try {
      const searches = await AsyncStorage.getItem('recentSearches');
      if (searches) {
        setRecentSearches(JSON.parse(searches));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem('recentSearches');
      setRecentSearches([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadRecentSearches();
  }, []);

  return (
    <Container>
      <TextInput
        placeholder="Enter GitHub username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <Button title="Search" onPress={fetchUser} />

      {userData && (
        <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { user: userData })}>
          <UserCard>
            <UserImage source={{ uri: userData.avatar_url }} />
            <View>
              <UserName>{userData.name}</UserName>
              <Text>{userData.login}</Text>
              <Text>{userData.location}</Text>
            </View>
          </UserCard>
        </TouchableOpacity>
      )}

      <Button title="Clear Recent Searches" onPress={clearRecentSearches} />

      <Text style={styles.header}>Recent Searches:</Text>
      <FlatList
        data={recentSearches}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { user: item })}>
            <UserCard>
              <UserImage source={{ uri: item.avatar_url }} />
              <View>
                <UserName>{item.name}</UserName>
                <Text>{item.login}</Text>
                <Text>{item.location}</Text>
              </View>
            </UserCard>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default HomeScreen;
