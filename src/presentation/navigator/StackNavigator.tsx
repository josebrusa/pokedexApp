import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { PokemonScreen } from '../screens/pokemon/PokemonScreen';
import { SearchScreen } from '../screens/search/SearchScreen';

export type RootStackParams = {
    HomeScreen: undefined,
    PokemonScreen: { pokemonId: number },
    SearchScreen: undefined,
}

const Stack = createStackNavigator<RootStackParams>();

export const Stacknavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />

        </Stack.Navigator>
    );
}