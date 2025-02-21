import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoginScreen from "../screens/(public)";

type AuthRoutes = {
    login: undefined;
    register: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="login"
                component={LoginScreen}
            />
        </Navigator>
    )
}