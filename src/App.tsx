import 'react-native-gesture-handler';

import { Stacknavigator } from './presentation/navigator/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <Stacknavigator />
      </ThemeContextProvider>
    </QueryClientProvider>

  );
}


