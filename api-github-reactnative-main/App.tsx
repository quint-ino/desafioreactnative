import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import UserDetailScreen from './src/screens/UserDetailScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Main Page' }}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={{ title: 'User Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
