import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login } from "../screens/Auth/Login";
import { Signup } from "../screens/Auth/Signup";
import { PasswordReset } from "../screens/Auth/PasswordReset";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator>
            <Screen name="login" component={Login} />
            <Screen name="signup" component={Signup} />
            <Screen name="passwordreset" component={PasswordReset} />
        </Navigator>
    )
}