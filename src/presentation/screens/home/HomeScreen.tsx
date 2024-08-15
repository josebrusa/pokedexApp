import { StyleSheet, View } from 'react-native';
import { getPokemons } from '../../../actions/pokemons';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { PoketballBg } from '../../components/ui/PoketballBg';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const queryClient = useQueryClient();

    //Todo foma basica de una peticion http
    // const { isLoading, data: pokemons = [] } = useQuery({
    //     queryKey: [ 'pokemons' ],
    //     queryFn: () => getPokemons(0),
    //     staleTime: 1000 * 60 * 60, // 60 minutes
    // })


    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: [ 'pokemons', 'infinite' ],
        initialPageParam: 0,
        staleTime: 1000 * 60 * 60, // 60 minutes
        queryFn: async (params) => {
            const pokemons = await getPokemons(params.pageParam);
            pokemons.forEach(pokemon => {
                queryClient.setQueryData([ 'pokemon', pokemon.id ], pokemon);
            });

            return pokemons;
        },
        getNextPageParam: (lastPage, pages) => pages.length, // number of pages loaded

    })

    return (
        <View style={globalTheme.globalMargin}>
            <PoketballBg style={styles.imgPosition} />

            <FlatList
                data={data?.pages.flat() ?? []}
                keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                ListHeaderComponent={() => (
                    <Text variant="displayMedium">Pokedex</Text>
                )}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
                onEndReached={() => fetchNextPage()}
                showsVerticalScrollIndicator={false}
            >
            </FlatList>
        </View>
    );
}


const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100,
    }
})

