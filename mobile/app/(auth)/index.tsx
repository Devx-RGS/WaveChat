import { View, Text, Dimensions, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import useAuthSocial from "@/hooks/useSocialAuth";
import { LinearGradient } from "expo-linear-gradient";



const { width, height } = Dimensions.get("window");

const AuthScreen = () => {
  const { handleSocialAuth, loadingStrategy } = useAuthSocial();

  const isLoading = loadingStrategy !== null;

  return (
    <View className="flex-1 bg-surface-dark">
      <View className="absolute inset-0 overflow-hidden">
        {/* Linear Gradient Base */}
        <LinearGradient
          colors={["#0D0D0F", "#1A1A2E", "#16213E", "#0D0D0F"]}
          style={{ position: "absolute", width: "100%", height: "500%" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        {/* Background Illustration (Anchored to bottom & scaled down) */}
        <Image
          source={require("../../assets/images/auth.png")}
          style={{ position: "absolute", width: "100%", height: "120%", bottom: 0 }}
          contentFit="contain"
        />


      </View>

      <SafeAreaView className="flex-1">
        {/* Top Section - Branding */}
        <View className="items-center pt-10">
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 100, height: 150, marginVertical: -20 }}
            contentFit="contain"
          />
          <Text className="text-4xl font-bold text-primary font-serif tracking-wider text-center mt-2">
            WaveChat
          </Text>
        </View>

        {/* MAIN CONTENT SECTION */}
        <View className="flex-1 items-center justify-end px-6 pb-12">
          {/* Headline */}
          <View className="items-center">
            <Text className="text-3xl font-bold text-foreground text-center font-sans">
              Connect Wave & Chat
            </Text>
            <Text className="text-xl font-bold text-primary font-mono">Seamlessly</Text>
          </View>

          {/* AUTH BUTTONS */}
          <View className="flex-row gap-4 mt-6">
            {/* GOOGLE BTN */}
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-2.5 rounded-xl active:scale-[0.97]"
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              onPress={() => !isLoading && handleSocialAuth("oauth_google")}
            >
              {loadingStrategy === "oauth_google" ? (
                <ActivityIndicator size="small" color="#1a1a1a" />
              ) : (
                <>
                  <Image
                    source={require("../../assets/images/google.png")}
                    style={{ width: 18, height: 18 }}
                    contentFit="contain"
                  />
                  <Text className="text-gray-900 font-semibold text-xs">Google</Text>
                </>
              )}
            </Pressable>

            {/* APPLE BTN */}
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 bg-white/10 py-2.5 rounded-xl border border-white/20 active:scale-[0.97]"
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Continue with Apple"
              onPress={() => !isLoading && handleSocialAuth("oauth_apple")}
            >
              {loadingStrategy === "oauth_apple" ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
                  <Text className="text-foreground font-semibold text-sm">Apple</Text>
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