import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'

const ChatsTab = () => {
  return (
    <ScrollView className = "bg-surface flex-1"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="pt-9 px-4">
      <Text className = "text-white">ChatsTab</Text>
    </ScrollView>
  );
};

export default ChatsTab