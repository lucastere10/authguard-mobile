import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen() {
  const handleSignInWithGoogle = () => {
    // Implement sign-in with Google logic here
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require('../../../assets/login.png')}
          style={{width: 350, height: 350}}
        />
      </View>
      <View
        style={{ flex: 2, paddingHorizontal: 20 }}
      >
        <Text style={{ fontSize: 40, fontWeight: "bold", color: "#1f2937" }}>
          Seu acesso.
        </Text>
        <Text style={{ fontSize: 40, fontWeight: "bold", color: "#1f2937" }}>
          Suas regras.
        </Text>
        <Text style={{ fontSize: 40, fontWeight: "bold", color: "#1f2937" }}>
          Nossa <Text style={{ color: "#d33f09" }}>Segurança.</Text>
        </Text>
        <Text
          style={{
            marginVertical: 32,
            fontSize: 18,
            color: "#4b5563",
          }}
        >
          Autenticação confiável. O Auth Guard protege sem comprometer a
          experiência.
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#d33f09",
            padding: 14,
            borderRadius: 8,
            paddingHorizontal: 28,
          }}
          onPress={handleSignInWithGoogle}
        >
          <AntDesign
            name="google"
            size={20}
            color="#fff"
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: "#fff", fontSize: 18 }}>
            Acessar com o Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
