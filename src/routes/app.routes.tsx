import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import HomeScreen from "../screens/(private)/homescreen";
import AuthGuardScreen from "../screens/(private)/(totp)/authguard";
import TotpScreen from "../screens/(private)/(totp)/totp";

type AppRoutes = {
    home: undefined;
    authguard: undefined;
    totp: undefined;
}

export type AppNavigatorRoutesProps = StackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createStackNavigator<AppRoutes>();

export function AppRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name='home'
                component={HomeScreen}
            />
            <Screen
                name='authguard'
                component={AuthGuardScreen}
            />
            <Screen
                name='totp'
                component={TotpScreen}
            />
        </Navigator>
    )
}
