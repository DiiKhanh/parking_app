import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {EditProfileScreen, ProfileScreen, EditPlatesIdScreen} from '../screens';

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="EditPlatesIdScreen" component={EditPlatesIdScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;