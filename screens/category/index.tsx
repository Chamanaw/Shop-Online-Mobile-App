import { Card, Text } from 'react-native-paper';
import {View,FlatList,StyleSheet } from 'react-native';
import style from './style';
import uuid from 'react-native-uuid'

const detail = [
    {
        category:"Smart Phone",
        image:"https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        category:"Headphone",
        image:"https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
]

function CategoryCard({uri,category}:{uri:string,category:string}){
    return(
        <Card style={style.container} mode='contained'>
                <Card.Cover
                    source={{ uri: uri}}
                    style={styles.image}
                    resizeMode='cover'
                />
                <Card.Content style={{paddingLeft:0}}>
                    <Text variant="labelLarge">{category}</Text>
                    <Text variant="labelMedium" style={{color:'gray'}}>16689 Item</Text>
                </Card.Content>
            </Card>
    )
}


function Category(){
    return(
        <FlatList
            data={detail}
            renderItem={(e)=><CategoryCard uri={e.item.image} category={e.item.category}/>}
            keyExtractor={()=>uuid.v4().toString()}
            numColumns={2}
            style={{padding:10,backgroundColor:"#ffffff"}}
            ListHeaderComponentStyle={{
                marginBottom:10
            }}
        />
    )
}

export default Category

const styles = StyleSheet.create({
    image:{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor:"#f0f0f0",
        height:170,
    }
})