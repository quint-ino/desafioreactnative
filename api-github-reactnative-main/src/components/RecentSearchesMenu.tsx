import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  padding: 20px;
`;

const RecentUserCard = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const RecentUserImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

const RecentUserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const RecentSearchesMenu: React.FC<{ recentUsers: any[], onSelectUser: (user: any) => void }> = ({ recentUsers, onSelectUser }) => {
  return (
    <Container>
      <Text>Recent Searches:</Text>
      <FlatList
        data={recentUsers}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectUser(item)}>
            <RecentUserCard>
              <RecentUserImage source={{ uri: item.avatar_url }} />
              <RecentUserName>{item.name}</RecentUserName>
            </RecentUserCard>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Container>
  );
};

export default RecentSearchesMenu;
