import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login } from "../screens/Auth/Login";
import { Signup } from "../screens/Auth/Signup";
import { PasswordReset } from "../screens/Auth/PasswordReset";

export type AuthRoutesType = {
  login: undefined;
  signup: undefined;
  passwordreset: undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesType>();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerTransparent: true,
        title: ''
      }}
    >
      <Screen name="login" component={Login} />
      <Screen name="signup" component={Signup} />
      <Screen name="passwordreset" component={PasswordReset} />
    </Navigator>
  )
}