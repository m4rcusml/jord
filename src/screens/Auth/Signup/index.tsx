import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";

const SignupFormSchema = z.object({
  email: z.string().email('Insira um email válido'),
  password: z.string().min(0, 'Insira sua senha'),
  confirmPassword: z.string().min(0, 'Insira sua senha'),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'As senhas não conferem',
    });
  }
});

type SignupForm = z.infer<typeof SignupFormSchema>;

GoogleSignin.configure({
  scopes: ['email', 'profile']
});

export function Signup() {
  const { handleSubmit, control, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(SignupFormSchema),
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