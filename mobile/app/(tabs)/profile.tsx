import { useAuth, useUser } from "@clerk/clerk-expo";
import { View, Text, ScrollView, Pressable, Modal, TextInput, ActivityIndicator } from "react-native";
import { useAuthCallback } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const MENU_SECTIONS = [
  {
    title: "Account",
    items: [
      { id: "edit_profile", icon: "person-outline", label: "Edit Profile", color: "#F4A261" },
      { id: "privacy", icon: "shield-checkmark-outline", label: "Privacy & Security", color: "#10B981" },
    ],
  },
  {
    title: "Support",
    items: [
      { id: "help", icon: "help-circle-outline", label: "Help Center", color: "#F59E0B" },
      { id: "contact", icon: "chatbubble-outline", label: "Contact Us", color: "#3B82F6" },
      { id: "rate", icon: "star-outline", label: "Rate the App", color: "#F4A261" },
    ],
  },
];

const ProfileTab = () => {
  const { signOut } = useAuth();
  const { user } = useUser();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { mutateAsync: syncUser } = useAuthCallback();
  const queryClient = useQueryClient();

  const openEditModal = () => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setIsEditModalVisible(true);
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setIsUpdating(true);
    try {
      await user.update({
        firstName,
        lastName,
      });
      await syncUser();
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setIsEditModalVisible(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <ScrollView
        className="bg-surface-dark"
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* HEADER  */}
        <View className="relative">
          <View className="items-center mt-10">
            <View className="relative">
              <View className="rounded-full border-2 border-primary">
                <Image
                  source={user?.imageUrl}
                  style={{ width: 100, height: 100, borderRadius: 999 }}
                />
              </View>

              <Pressable className="absolute bottom-1 right-1 w-8 h-8 bg-primary rounded-full items-center justify-center border-2 border-surface-dark">
                <Ionicons name="camera" size={16} color="#0D0D0F" />
              </Pressable>
            </View>

            {/* NAME & EMAIL */}
            <Text className="text-2xl font-bold text-foreground mt-4">
              {user?.firstName} {user?.lastName}
            </Text>

            <Text className="text-muted-foreground mt-1">
              {user?.emailAddresses[0]?.emailAddress}
            </Text>

            <View className="flex-row items-center mt-3 bg-green-500/20 px-3 py-1.5 rounded-full">
              <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <Text className="text-green-500 text-sm font-medium">Online</Text>
            </View>
          </View>
        </View>

        {/* MENU SECTIONS */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} className="mt-6 mx-5">
            <Text className="text-subtle-foreground text-xs font-semibold uppercase tracking-wider mb-2 ml-1">
              {section.title}
            </Text>
            <View className="bg-surface-card rounded-2xl overflow-hidden">
              {section.items.map((item, index) => (
                <Pressable
                  key={item.label}
                  onPress={() => {
                    if (item.id === "edit_profile") {
                      openEditModal();
                    }
                  }}
                  className={`flex-row items-center px-4 py-3.5 active:bg-surface-light ${
                    index < section.items.length - 1 ? "border-b border-surface-light" : ""
                  }`}
                >
                  <View
                    className="w-9 h-9 rounded-xl items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Ionicons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <Text className="flex-1 ml-3 text-foreground font-medium">{item.label}</Text>
                  {(item as any).value && (
                    <Text className="text-subtle-foreground text-sm mr-1">{(item as any).value}</Text>
                  )}
                  <Ionicons name="chevron-forward" size={18} color="#6B6B70" />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <Pressable
          className="mx-5 mt-8 bg-red-500/10 rounded-2xl py-4 items-center active:opacity-70 border border-red-500/20"
          onPress={() => signOut()}
        >
          <View className="flex-row items-center">
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text className="ml-2 text-red-500 font-semibold">Log Out</Text>
          </View>
        </Pressable>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <View className="bg-surface w-full rounded-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-foreground text-xl font-bold">Edit Profile</Text>
              <Pressable onPress={() => setIsEditModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6B6B70" />
              </Pressable>
            </View>

            <View className="mb-4">
              <Text className="text-subtle-foreground text-xs uppercase tracking-wider mb-2 ml-1 font-semibold">First Name</Text>
              <TextInput
                className="bg-surface-light text-foreground px-4 py-3 rounded-xl"
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
                placeholderTextColor="#6B6B70"
              />
            </View>

            <View className="mb-6">
              <Text className="text-subtle-foreground text-xs uppercase tracking-wider mb-2 ml-1 font-semibold">Last Name</Text>
              <TextInput
                className="bg-surface-light text-foreground px-4 py-3 rounded-xl"
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
                placeholderTextColor="#6B6B70"
              />
            </View>

            <Pressable
              className="bg-primary py-3.5 rounded-xl items-center flex-row justify-center"
              onPress={handleUpdateProfile}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <ActivityIndicator size="small" color="#0D0D0F" />
              ) : (
                <Text className="text-[#0D0D0F] font-bold text-base">Save Changes</Text>
              )}
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfileTab;