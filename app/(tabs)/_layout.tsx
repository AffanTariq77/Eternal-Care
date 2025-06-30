import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0a3d3d',
      }}
    >
      <Tabs.Screen
        name="GraveCareService"
        options={{
          title: 'Grave Care',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'broom' : 'broom'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="HelpCenter"
        options={{
          title: 'Support',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'headset' : 'headset-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="GraveyardBooking"
        options={{
          title: 'Booking',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name={focused ? 'book-open' : 'book'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="QuranRecitation"
        options={{
          title: 'Quran',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'book-open-variant' : 'book-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
