import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { QrCode, LogOut } from "lucide-react-native";
import { useAuth } from "@/src/context/AuthContext";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { userInfo, signOut } = useAuth();

  const handleQRCodeReader = () => {
    navigation.navigate("authguard");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
        marginTop: 0,
      }}
    >
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <TouchableOpacity onPress={signOut} style={{ marginRight: 10 }}>
          <LogOut color="#d33f09" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginRight: 10, alignItems: "flex-end" }}>
          <Text style={{ fontSize: 16, color: "#1f2937" }}>
            {userInfo.data.user.name}
          </Text>
          <Text style={{ fontSize: 12, color: "#1f2937" }}>
            {userInfo.data.user.email}
          </Text>
        </View>
        <Image
          source={{ uri: userInfo.data.user.photo }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#1f2937",
            textAlign: "center",
          }}
        >
          Simples, Prático, <Text style={{ color: "#d33f09" }}>Seguro</Text>
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#4b5563",
            textAlign: "center",
            marginTop: 12,
          }}
        >
          Autenticação moderna e confiável para sua tranquilidade. Proteção,
          comodidade e tecnologia a seu favor.
        </Text>
      </View>

      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../../../assets/home.png")}
          style={{ width: 400, height: 400 }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#d33f09",
            padding: 20,
            borderRadius: 75,
            justifyContent: "center",
            alignItems: "center",
            width: 120,
            height: 120,
          }}
          onPress={handleQRCodeReader}
        >
          <QrCode color="#ffffff" size={80} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
