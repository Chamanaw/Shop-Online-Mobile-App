import{FlatList} from"react-native"
import CardCart from "../../components/cardCart"
import uuid from 'react-native-uuid';
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { cartSelector } from "../../redux/slices/cartSlice";
import { useAppDispacth } from "../../redux/store";
import { useEffect } from "react";
import { fetchCart } from "../../redux/slices/cartSlice";
import axios from "../../services";

function Cart (){

    const cart =  useSelector(cartSelector)
    const dispatch = useAppDispacth()
    
    const getCart = async() =>{
        await dispatch(fetchCart())
    }

    useEffect(()=>{
        getCart()
    },[])

    return(
        <FlatList
            data={cart.cart}
            renderItem={(
                {item,index})=>( (index % 2 == 0)
                ?<CardCart items={item}  background='#ffffff' />
                :<CardCart items={item} background='#fafafa' />
            )}
            
            keyExtractor={()=>uuid.v4().toString()}
            ListFooterComponent={
                <Button mode="contained"  buttonColor='#5677fc' style={{borderRadius:10,marginTop:10,marginHorizontal:5,marginBottom:20,backgroundColor:"#ff4c3b"}}>Continue</Button>
            }
        />
    )
}

export default Cart
