import { useState } from 'react';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export function Routes() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  auth().onAuthStateChanged(user => {
    setUser(user);
  });

  return user ? <AppRoutes /> : <AuthRoutes />
}