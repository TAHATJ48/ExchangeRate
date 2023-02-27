import { useNavigation } from "@react-navigation/native"
import { View, Button } from "react-native"

export default function ExempleFullScreenModal() {

    let navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Close" onPress={() => {
                navigation.goBack()
            }} />
        </View>
    )
}