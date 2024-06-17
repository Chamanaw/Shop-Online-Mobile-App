import { View, FlatList } from 'react-native'
import Header from '../../components/header'
import { Text } from 'react-native-paper'
import style from './style'
import CardProduct from '../../components/card'
import { Products } from '../../mocks/data'
import uuid from 'react-native-uuid'


function ResultSearch() {
    return (
        <View>
            <Header />
            <FlatList
                data={Products}
                renderItem={({ item }) => <CardProduct category={item.c_name} name={item.name} price={item.price} />}
                keyExtractor={() => uuid.v4().toString()}
                numColumns={2}
                ListHeaderComponent={ <Text variant='titleMedium' style={style.text}>Result for</Text>}
                style={{
                    backgroundColor: "#eceff1"
                }}
            />
        </View>
    )
}

export default ResultSearch