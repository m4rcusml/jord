import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthRoutesType } from "../../../routes/auth.routes";

import auth from '@react-native-firebase/auth';

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";

import Logo from '../../../assets/logo.png';
import GoogleLogo from '../../../assets/google-logo.png';

const LoginFormSchema = z.object({
  email: z.string().email('Insira um email válido'),
  password: z.string().min(0, 'Insira sua senha'),
});

type LoginForm = z.infer<typeof LoginFormSchema>;

GoogleSignin.configure({
  scopes: ['email', 'profile']
});

export function Login() {
  const { navigate } = useNavigation<NavigationProp<AuthRoutesType>>();
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
      <Image
        source={Logo}
        style={styles.logo}
        resizeMode='contain'
      />

      <KeyboardAvoidingView behavior='padding' style={{ gap: 20 }}>
        <View style={styles.textfield}>
          <Text style={styles.text}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite seu email'
          />
        </View>
        <View style={styles.textfield}>
          <Text style={styles.text}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite sua senha'
          />
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity style={{ alignSelf: 'center', gap: 1 }} onPress={() => navigate('passwordreset')}>
        <Text style={styles.text}>Esqueceu a senha?</Text>
        <View style={styles.hr} />
      </TouchableOpacity>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigate('signup')}>
          <Text style={styles.text}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{ alignSelf: 'center' }} onPress={loginWithGoogle}>
        <Image
          source={GoogleLogo}
          style={{ width: 32, height: 32 }}
          resizeMode='contain'
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    padding: 32,
    justifyContent: 'space-around',
    backgroundColor: '#A9B1B6'
  },
  logo: {
    alignSelf: 'center',
    width: '100%',
    height: 160
  },
  textfield: {
    gap: 10
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  text: {
    color: '#02084B',
  },
  hr: {
    height: 0.8,
    backgroundColor: '#02084B'
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})