import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { PropsWithChildren } from 'react';
import { Stacknavigator } from './presentation/navigator/StackNavigator';

export const App = ({ children }: PropsWithChildren) => {
  return (
    <NavigationContainer>
      <Stacknavigator />
    </NavigationContainer>
  );
}


