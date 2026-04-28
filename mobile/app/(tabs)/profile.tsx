import { View, Text, ScrollView, Pressable } from 'react-native'
import { useAuth, useUser } from '@clerk/clerk-expo'

const ProfileTab = () => {
  const {signOut} =useAuth()
  return (
    <ScrollView className = "bg-surface"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="pt-9 px-4">
      <Text className = "text-white">Profile Tab</Text>
      <Pressable onPress={() => signOut()} className="mt-2 bg-red-600 px-4 py-1 rounded-lg">
        <Text>Signout</Text>
      </Pressable>
    </ScrollView>
  );
};
export default ProfileTab