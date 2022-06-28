import React,{ useState,Component } from 'react'
import {Colors, Images, Fonts } from '../constants'
import { Text, View,Image,Dimensions,SafeAreaView,StyleSheet, Button} from 'react-native';
import foods from '../constants/foods';
import categories from '../constants/categories';
//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    FlatList,
    ScrollView,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
  } from 'react-native-gesture-handler';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  
var { width } = Dimensions.get("screen");
const cardWidth = width/2-20;


export default class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }
  
  render(){  
    return(
        <SafeAreaView style={{flex: 1, backgroundColor:"#fff"}}>
        <View style={style.header}>
            <View>
            <View style={{flexDirection:"row"}}>
            <Image
             source={Images.PLATE} resizeMethod="auto" style={style.image}
            />     
            </View>
            <Text style={{marginTop:15, fontSize:30, color:"#908e8c",fontWeight:"bold"}}>
            ምርት ምግብ ደስታን ይፈትራል ብለን እናምናለን
            </Text>
        </View>
        </View>

        <View
            style={{
                marginTop: 40,
                flexDirection:'row',
                paddingHorizontal: 20,
            }}>
                <View style={style.inputContainer}>
                <FontAwesome5 name="search" size={28}/>
                <TextInput style={{flex:1, fontSize: 18}} 
                  placeholder="search for food"/>
                </View>
            </View>

            <View style={{width:width,borderRadius:20,paddingVertical:20}}>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({item}) => this.ListCataegories (item)}
            />
            </View>
            <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={foods}
            renderItem={({item}) => this.Card (item)}
          />       
    </SafeAreaView>
    );
};


Card (item) {
  return (
         
     
  <SafeAreaView>     
  <View style={{
   height:230,
   width: cardWidth,
   marginHorizontal:10,
   marginBottom:20,
   backgroundColor:"#FFF",
   borderRadius:15,
   marginTop:50,
   elevation:13
   
 }}>
    

      

    <View style={{alignItems:'center', top: -30}}>
    <Image source={item.image} style={{width:120,height:120}}/> 
    </View>
    <View style={{marginHorizontal:20}}>
    <Text style={{fontSize: 18, fontWeight:"bold"}}>{item.name}</Text>
    <Text style={{fontSize: 14, color: "#908e8c", marginTop: 2}}>{item.ingredients}</Text>  
    </View> 
      <View style={{
             marginTop:10,
             marginHorizontal:20,
             flexDirection:'row',
             justifyContent:'space-between'
             }}>
               <Text style={{fontSize:18,fontWeight:'bold'}}>${item.price}</Text>
               
               <TouchableOpacity  style={style.addToCartBtn} 
               
               onPress={()=> this.addToCart(item)}
               
               >
                
               <FontAwesome5 name="plus-circle" size={30} color={"#ffffff"}/>  
               </TouchableOpacity >
             </View>
           </View>
          
     </SafeAreaView >  
  )
 
}


ListCataegories(item) {
  return(
      <TouchableOpacity
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{margin:2}}
          >
              <View style={{
                alignItems:"center",
                flexDirection:"row",
                backgroundColor:"#f9dd7a",
                marginHorizontal:15,
                borderRadius:25,
                paddingVertical:5,
                paddingHorizontal:15

              }}>
                <Image 
                 source={(item.image)}
                 style={{height:40,width:40}}
                />
                  <Text style={{
                    fontWeight:"bold",
                    fontSize:18,
                    paddingLeft:10
                  }}>
                    {item.name}
                  </Text>
                  </View>

         
         
      </TouchableOpacity>
  );
};

addToCart(data){
  //setCart([...cart, food]);
  const itemcart = {
    food:data,
    quantity:1,
    price:data.price
  }
  
  AsyncStorage.getItem("cart").then((datacart) => {
    if (datacart !== null) {
      // We have data!!
      const cart = JSON.parse(datacart)
      cart.push(itemcart)
      AsyncStorage.setItem("cart",JSON.stringify(cart))
    }
      else{
        const cart  = []
        cart.push(itemcart)
        AsyncStorage.setItem("cart",JSON.stringify(cart))
      }
      alert("Add Cart")

  })
  .catch((err)=>{
   alert(err)
 })
 

}



};

const style = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      },
      categoryListContainer:{
          paddingVertical: 30,
          alignItems:'center',
          paddingHorizontal: 20
      },
      inputContainer: {
          flex: 1,
          height: 50,
          borderRadius: 10,
          flexDirection: 'row',
          backgroundColor: "#E5E5E5",
          alignItems: 'center',
          paddingHorizontal: 20,
        },
        sortBtn: {
          width: 50,
          height: 50,
          marginLeft: 10,
          backgroundColor: "#F9813A",
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        },
        categoriesListContainer: {
          paddingVertical: 30,
          alignItems: 'center',
          paddingHorizontal: 20,
        },
      categoryBtn: {
          height: 45,
          width: 120,
          marginRight: 7,
          borderRadius: 30,
          alignItems:"center",
          paddingHorizontal:5,
          flexDirection:'row'
  
        },
        categoryBtnImgCon: {
          height: 35,
          width: 35,
          backgroundColor: "#FFF",
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        },
  
        addToCartBtn:{
          height:30,
          width:30,
          borderRadius:20,
          backgroundColor:"#f9dd7a",
          justifyContent:'center',
          alignItems:'center'
        },
});

