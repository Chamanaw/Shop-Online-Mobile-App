import { StyleSheet, View, StatusBar } from 'react-native'
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Search from '../search';

function Header() {


    return (
        <View style={style.container}>
            <View style={style.icon}>
                <Ionicons name="bag-handle" size={34} color="white"  />
            </View>
            <Search />
        </View>
    )
}

export default Header

const style = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#5677fc",
        flexDirection: "row",
        flexWrap:"nowrap",
        justifyContent:"space-around",
        paddingVertical:15
    },
    icon: {
        marginTop: StatusBar.currentHeight,
        width:"10%",
        
    }
})