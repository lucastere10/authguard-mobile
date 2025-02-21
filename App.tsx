import { StatusBar } from "expo-status-bar";
import "@/global.css";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { AuthProvider } from "./src/context/AuthContext";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <StatusBar backgroundColor="#FF6B35" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </GluestackUIProvider>
  );
}
