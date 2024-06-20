import { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthRoutesType } from '../../../routes/auth.routes';

import auth from '@react-native-firebase/auth';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import Logo from '../../../assets/logo.png';
import GoogleLogo from '../../../assets/google-logo.png';

const LoginFormSchema = z.object({
  email: z.string({ message: 'Campo obrigatório' }).email('Insira um email válido'),
  password: z.string({ message: 'Campo obrigatório' }).min(0, 'Insira sua senha'),
});

type LoginForm = z.infer<typeof LoginFormSchema>;

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: '227858259368-s9d98824oek9ebdu1scjn8svp2unmsjo.apps.googleusercontent.com'
});

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation<NavigationProp<AuthRoutesType>>();
  const { handleSubmit, control, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
    mode: 'onChange',
  });

  async function loginWithGoogle() {
    try {
      setIsLoading(true);
      GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      auth().signInWithCredential(auth.GoogleAuthProvider.credential(idToken))
    } catch (error) {
      console.log(error);
      Alert.alert('Ocorreu um erro', 'Tente novamente mais tarde.')
      setIsLoading(false);
    }
  };

  async function handleLogin({email, password}: LoginForm) {
    try {
      setIsLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      Alert.alert('Ocorreu um erro', 'Tente novamente mais tarde.')
      setIsLoading(false);
    }
  }

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
          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                autoCapitalize='none'
                value={value}
                style={styles.input}
                onChangeText={onChange}
                placeholder='Digite seu email'
              />
            )} />
          {errors.email?.message && <Text style={[styles.text, { color: 'red', alignSelf: 'flex-end' }]}>{errors.email.message}</Text>}
        </View>
        <View style={styles.textfield}>
          <Text style={styles.text}>Senha</Text>
          <Controller
            name='password'
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                autoCapitalize='none'
                value={value}
                style={styles.input}
                onChangeText={onChange}
                placeholder='Digite sua senha'
                secureTextEntry
              />
            )} />
          {errors.password?.message && <Text style={[styles.text, { color: 'red', alignSelf: 'flex-end' }]}>{errors.password.message}</Text>}
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity style={{ alignSelf: 'center', gap: 1 }} onPress={() => navigate('passwordreset')}>
        <Text style={styles.text}>Esqueceu a senha?</Text>
        <View style={styles.hr} />
      </TouchableOpacity>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(handleLogin)}>
          <Text style={styles.text}>{isLoading ? <ActivityIndicator color='#02084B' /> : 'Entrar'}</Text>
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