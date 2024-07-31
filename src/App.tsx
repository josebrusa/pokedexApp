import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { PropsWithChildren } from 'react';
import { Stacknavigator } from './presentation/navigator/StackNavigator';
import { PaperProvider } from 'react-native-paper';

export const App = ({ children }: PropsWithChildren) => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stacknavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}


