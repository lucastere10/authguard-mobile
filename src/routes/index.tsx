import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import SplashScreen from "@/src/screens/splashscreen";
import { useAuth } from "@/src/context/AuthContext";

export function Routes() {
  const { isLoading, isSignedIn } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isSignedIn ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
