import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from '../../Screens/FavoriteStack/FavoritesScreen';
import FavoriteRates from '../../Screens/FavoriteStack/FavoriteRates';

const HomeStack = createNativeStackNavigator();

export default function FavoritesStack() {
    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name="Favorites" component={FavoritesScreen} />
            <HomeStack.Screen name="FavoriteRates" component={FavoriteRates} />
        </HomeStack.Navigator>
    );
}