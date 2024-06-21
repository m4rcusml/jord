import { Alert, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Entypo } from '@expo/vector-icons';
import { Home } from '../screens/Home';

import auth from '@react-native-firebase/auth';
import Logo from '../assets/logo.png';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  function signOut() {
    Alert.alert('Sair', 'Deseja mesmo sair da sua conta?', [
      { text: 'Não' },
      {
        text: 'Sim', onPress: () => {
          auth().currentUser?.providerData[0].providerId === 'google.com'
            ?
            auth().signOut().then(() => {
              GoogleSignin.revokeAccess();
              GoogleSignin.signOut();
            })
            :
            auth().signOut();
        }
      },
    ])
  }

  return (
    <Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTitle: () => (
          <Image
            resizeMode='contain'
            source={Logo}
            style={{
              width: 90,
              aspectRatio: '16 / 9'
            }}
          />
        ),
        headerRight: () => (
          <TouchableOpacity onPress={signOut}>
            <Entypo
              name='log-out'
              color='black'
              size={24}
              onPress={signOut}
            />
          </TouchableOpacity>
        )
      }}
    >
      <Screen name='Home' component={Home} />
    </Navigator>
  )
}