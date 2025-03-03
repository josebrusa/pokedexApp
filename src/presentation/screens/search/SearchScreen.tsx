import { FlatList, View } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonsByIds, getPokemonsNameById } from '../../../actions/pokemons';
import { useMemo, useState } from 'react';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { UseDebouncedValue } from '../../hooks/useDebouncedValue';

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const [ term, setTerm ] = useState('');

    const debouncedValue = UseDebouncedValue(term)

    const { isLoading, data: pokemonNameList = [] } = useQuery({
        queryKey: [ 'pokemons', 'all' ],
        queryFn: () => getPokemonsNameById(),
    });


    const pokemonNameIdList = useMemo(() => {

        if (!isNaN(Number(debouncedValue))) {
            const pokemon = pokemonNameList.find(pokemon => pokemon.id === Number(debouncedValue));
            return pokemon ? [ pokemon ] : [];
        }
        if (debouncedValue.length === 0) return [];
        if (debouncedValue.length < 3) return [];

        return pokemonNameList.filter(
            pokemon => pokemon.name.includes(debouncedValue.toLowerCase())
        )
    }, [ debouncedValue ]);

    const {isLoading: isLoadingPokemons, data:pokemons = []} = useQuery({
        queryKey: [ 'pokemons', 'by', pokemonNameIdList ],
        queryFn: () => getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
        staleTime: 1000 * 60 * 5, // 1 hour
    });

    if (isLoading) {
        return < FullScreenLoader />
    }

    return (
        <View
            style={[ globalTheme.globalMargin, {
                paddingTop: top + 10,
            } ]}
        >
            <TextInput
                placeholder='Buscar pokemon'
                mode='flat'
                autoFocus
                autoCorrect={false}
                onChangeText={setTerm}
                value={term}
            />

            {isLoadingPokemons && <ActivityIndicator style={{ paddingTop: 20 }} />}

            
            <FlatList
                data={pokemons}
                keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <View 
                    style={{height:120}}
                    />
                }
            />
        </View>
    );
}
