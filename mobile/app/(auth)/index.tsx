import { View, Text, Dimensions, Pressable, ActivityIndicator, } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useAuthSocial from '@/hooks/useSocialAuth';


const { width, height } = Dimensions.get("window");

const AuthScreen = () => {
  const { handleSocialAuth, loadingStrategy } = useAuthSocial();
  const isLoading = loadingStrategy !== null;
  return (
    <View className="flex-1 bg-surface-dark">
      <Image
        source={require("../../assets/images/auth.png")}
        style={{ width: width , height: height * 0.75, position: 'absolute', top: 25 }}
        contentFit="cover"
      />
      <SafeAreaView className="flex-1">
        <View className="items-center justify-center py-8">
          <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 120, height: 120 }}
          contentFit="contain"/>
          <Text className="text-4xl font-bold text-primary font-serif tracking-wider uppercase mt-2">WaveChat
          </Text>
        </View>

        <View className="flex-1 justify-end items-center px-6 pb-10">
          <View className="items-center">
            <Text className="text-2xl font-bold text-sky-400 text-center font-sans mb-1">Connect Wave & Chat
            </Text>
          </View>
          <View className="flex-row gap-4 mt-10">
            <Pressable
            className="flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-[0.97]"
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel='Continue with Google'
              onPress={() => isLoading && handleSocialAuth('oauth_google')}
            >
              {loadingStrategy === "oauth_google" ? (
                <ActivityIndicator size="small"color="#1a1a1a" />
              ) : (
                <>
                <Image source={require("../../assets/images/google.png")} style={{ width: 24, height: 24 }} contentFit="contain" />
                <Text className ="text-gray-900 font-semibold text-sm">Google</Text>
                </>
              )}
            </Pressable>

            <Pressable
            className="flex-1 flex-row items-center justify-center gap-2 bg-white/10 py-4 rounded-2xl border border-white/20 active:scale-[0.97]"
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel='Continue with Apple'
              onPress={() => isLoading && handleSocialAuth('oauth_apple')}
            >
              {loadingStrategy === "oauth_apple" ? (
                <ActivityIndicator size="small"color="#FFFFFF" />
              ) : (
                <>
                <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
                <Text className ="text-foreground font-semibold text-sm">Apple</Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
