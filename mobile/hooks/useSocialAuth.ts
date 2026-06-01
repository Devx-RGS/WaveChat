import { useSSO } from "@clerk/clerk-expo";
import { useState, useCallback } from "react";
import { Alert } from "react-native";
import * as Linking from "expo-linking";

function useAuthSocial() {
    const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
    const { startSSOFlow } = useSSO();

    const handleSocialAuth = useCallback(async(strategy: "oauth_google" | "oauth_apple") => {
        if(loadingStrategy) return;
        setLoadingStrategy(strategy)

        try{
            const redirectUrl = Linking.createURL("/(auth)");
            const { createdSessionId, setActive } = await startSSOFlow ({ strategy, redirectUrl })
            if(!createdSessionId || !setActive){
                const provider = strategy === "oauth_google" ? "Google" : "Apple";
                Alert.alert(
                    "Sign-in incomplete",
                    `${provider} sign-in was not completed. Please try again.`
                );
                return;
            }
            await setActive({ session: createdSessionId });     
        }
        catch(error){
            console.error("Social auth error:", error);
            const provider = strategy === "oauth_google" ? "Google": "Apple"
            Alert.alert("Error", `Failed to sign in with ${provider}. Please try again`);
        }
        finally { setLoadingStrategy(null);
        }
    }, [loadingStrategy, startSSOFlow]);


    return { handleSocialAuth, loadingStrategy }
};

export default useAuthSocial;