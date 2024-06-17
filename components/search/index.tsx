import { StatusBar, StyleSheet, View } from 'react-native'
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';

function Search() {

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={style.container}>
            <Searchbar
                placeholder="Search Here"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={style.search}
                inputStyle={{
                    minHeight: 0,
                }}
                placeholderTextColor="gray"
                selectionColor="#757575"
            />
        </View>
    )
}

export default Search

const style = StyleSheet.create({
    search: {
        backgroundColor: "#f0f0f0",
        borderRadius:10
    },
    container:{
        padding:10
    }
}) 