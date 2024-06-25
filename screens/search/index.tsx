import { Card, Text } from 'react-native-paper';
import {View,FlatList,StyleSheet } from 'react-native';
import style from './style';
import uuid from 'react-native-uuid'
import Search from '../../components/search';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStack } from '../../navigation/stackNavigator';
import { useSelector } from 'react-redux';
import { productSelector } from '../../redux/slices/productSlice';
import { useState } from 'react';
import axios from '../../services';

interface Props {
    uri:string
    category:string
    quantity:number
}

function CategoryCard({uri,category,quantity}:Props){
    return(
        <Card style={style.container} mode='contained'>
                <Card.Cover
                    source={{ uri: uri}}
                    style={styles.image}
                    resizeMode='cover'
                />
                <Card.Content style={{paddingLeft:0}}>
                    <Text variant="titleSmall">{category}</Text>
                    <Text variant="labelMedium" style={{color:'gray'}}>{quantity} Item</Text>
                </Card.Content>
            </Card>
    )
}


type SearchStack = NativeStackScreenProps<RootStack,"SearchStack">

function SearchPage({navigation}:SearchStack){

    const [] = useState('')
    const {products} = useSelector(productSelector)
    const phone = products.filter((ele)=>ele.c_name === "Smart Phone")
    const headPhone = products.filter((ele)=>ele.c_name === "Headphones")
    const electricalAppliance = products.filter((ele)=>ele.c_name === "Electrical Appliance")

    const detail_category = [
        {
            category:"Smart Phone",
            image:axios.getUri()+phone[0].image,
            quantity:phone.length
        },
        {
            category:"Headphone",
            image:axios.getUri()+headPhone[0].image,
            quantity:headPhone.length
        },
        {
            category:"Electrical Appliance",
            image:axios.getUri()+electricalAppliance[0].image,
            quantity:electricalAppliance.length
        },
    ]

    return(
        <FlatList
            data={detail_category}
            renderItem={({item})=><CategoryCard uri={item.image} category={item.category} quantity={item.quantity}/>}
            keyExtractor={()=>uuid.v4().toString()}
            numColumns={2}
            ListHeaderComponent={()=><View><Search navigation={navigation} /></View>}
            style={{
                backgroundColor:'#ffffff',
            }}
            contentContainerStyle={{
                paddingBottom: 20,
            }}
            ListHeaderComponentStyle={{ width: '100%',padding:0 }}
            
        />
    )
}

export default SearchPage

const styles = StyleSheet.create({
    image:{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor:"#f0f0f0",
        height:170,
    }
})