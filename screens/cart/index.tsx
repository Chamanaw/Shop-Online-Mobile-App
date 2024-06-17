import{FlatList} from"react-native"
import CardCart from "../../components/cardCart"
import { Products } from "../../mocks/data"
import uuid from 'react-native-uuid';
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { cartSelector } from "../../redux/slices/cartSlice";
import { useAppDispacth } from "../../redux/store";
import { useEffect } from "react";
import { fetchCart } from "../../redux/slices/cartSlice";


function Cart (){

    const cart =  useSelector(cartSelector)
    const dispatch = useAppDispacth()
    
    const fetchCart = async() =>{
        await dispatch(fetchCart)
    }

    useEffect(()=>{
        if(!cart.cart){
            fetchCart()
        }
    },[])

    return(
        <FlatList
            data={cart.cart}
            renderItem={(
                {item,index})=>( (index % 2 == 0)
                ?<CardCart name={item.name} brand={item.brand} price={item.price} background='#ffffff'/>
                :<CardCart name={item.name} brand={item.brand} price={item.price} background='#fafafa'/>
            )}
            
            keyExtractor={()=>uuid.v4().toString()}
            ListFooterComponent={
                <Button mode="contained"  buttonColor='#5677fc' style={{borderRadius:10,marginTop:10,marginHorizontal:5,marginBottom:20,backgroundColor:"#ff4c3b"}}>Continue</Button>
            }
        />
    )
}

export default Cart
