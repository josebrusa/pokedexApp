import 'react-native-gesture-handler';

import { Stacknavigator } from './presentation/navigator/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';

export const App = () => {
  return (
    <ThemeContextProvider>
      <Stacknavigator />
    </ThemeContextProvider>

  );
}


