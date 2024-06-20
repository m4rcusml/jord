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

const PasswordResetFormSchema = z.object({
  email: z.string({ message: 'Campo obrigatório' }).email('Insira um email válido'),
});

type PasswordResetForm = z.infer<typeof PasswordResetFormSchema>;

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: '227858259368-s9d98824oek9ebdu1scjn8svp2unmsjo.apps.googleusercontent.com'
});

export function PasswordReset() {
  const [isLoading, setIsLoading] = useState(false);
  const { navigate, goBack } = useNavigation<NavigationProp<AuthRoutesType>>();
  const { handleSubmit, control, formState: { errors } } = useForm<PasswordResetForm>({
    resolver: zodResolver(PasswordResetFormSchema),
    mode: 'onChange',
  });

  function handleResetPassword({ email }: PasswordResetForm) {
    try {
      setIsLoading(true);
      auth().sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Redefinir senha',
          'Um link de redefinição de senha foi enviado para o seu email com sucesso.',
          [{ text: 'Ok', onPress: goBack }]
        );
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
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
      </KeyboardAvoidingView>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(handleResetPassword)}>
          <Text style={styles.text}>
            {isLoading
              ? <ActivityIndicator color='#02084B' />
              : 'Enviar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <Text style={styles.text}>Voltar</Text>
        </TouchableOpacity>
      </View>
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