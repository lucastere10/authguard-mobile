import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { authenticateWithProvider } from "@/src/service/api";
import { WEB_CLIENT_ID } from "@env";

interface AuthContextType {
  isLoading: boolean;
  isSignedIn: boolean;
  userInfo: any;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["email"],
      webClientId: WEB_CLIENT_ID,
    });

    const fetchAuthStatus = async () => {
      try {
        const user = await AsyncStorage.getItem("userInfo");
        if (user) {
          setUserInfo(JSON.parse(user));
          setIsSignedIn(true);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch auth status");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchAuthStatus();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.data?.idToken) {
        const authResponse = await authenticateWithProvider(
          userInfo.data.idToken
        );
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        await AsyncStorage.setItem("token", authResponse.token);
        setUserInfo(userInfo);
        setIsSignedIn(true);
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Login Cancelado", "Você cancelou o processo de login.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Login em Progresso", "O login já está em andamento.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          "Serviços do Google Play Indisponíveis",
          "Os serviços do Google Play não estão disponíveis ou estão desatualizados."
        );
      } else {
        Alert.alert(
          "Erro de Login",
          "Ocorreu um erro durante o login. Por favor, tente novamente."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem("userInfo");
      setUserInfo(null);
      setIsSignedIn(false);
    } catch (error) {
      Alert.alert("Erro", "Falha ao sair.");
    }
  };

  const value = React.useMemo(
    () => ({ isLoading, isSignedIn, userInfo, signInWithGoogle, signOut }),
    [isLoading, isSignedIn, userInfo]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
