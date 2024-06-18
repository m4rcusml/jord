import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";

const LoginFormSchema = z.object({
  email: z.string().email('Insira um email válido'),
  password: z.string().min(0, 'Insira sua senha'),
});

type LoginForm = z.infer<typeof LoginFormSchema>;

GoogleSignin.configure({
  scopes: ['email', 'profile']
});

export function Login() {
  const { handleSubmit, control, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
    mode: 'onChange',
  });
  
  async function loginWithGoogle() {
    try {
      const { idToken } = await GoogleSignin.signIn();
      auth().signInWithCredential(auth.GoogleAuthProvider.credential(idToken))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})