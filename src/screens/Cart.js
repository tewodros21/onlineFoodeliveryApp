import React, { Component,Linking } from 'react';
import { Text, View, Image, Dimensions,TouchableOpacity,Modal } from 'react-native';

import WebView from 'react-native-webview';



var { width } = Dimensions.get("window")

// import icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Cart extends Component {

   state = {
    showModal: false,
    status:"Pending"
  };

  constructor(props){
    super(props);
    this.state = {
      dataCart:[],

    };
  }

 
  handleResponse = data =>{
    if(data.title === 'success'){
      this.setState({ showModal: false, status:'Complete' });
    }else if(data.title === 'cancle'){
      this.setState({ showModal: false, status:'Cancelled' });
    }else{
      return;
    }

  }
   

  componentDidMount(){

    AsyncStorage.getItem("cart").then((cart)=>{
      if (cart !== null){
        const cartfood = JSON.parse(cart)
        this.setState({dataCart:cartfood})
      }
    })
    .catch((err)=>{
      alert(err)
    })
  }
    render(){
  //const [url, setUrl] = useState('https://localhost:3000');
      
    return (
      <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
      <View style={{height:20}} />
      <Text style={{fontSize:32,fontWeight:"bold",color:"#f9dd7a"}}>Cart Food</Text>
      <View style={{height:10}} />

      <View style={{flex:1}}>
        

        <ScrollView>

          {
            this.state.dataCart.map((item,i)=>{
              return(
                <View style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
                  <Image resizeMode={"contain"} style={{width:width/3,height:width/3}} source={ item.food.image } />
                  <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
                    <View>
                      <Text style={{fontWeight:"bold", fontSize:20}}>{item.food.name}</Text>
                      <Text>{item.food.ingredients}</Text>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <Text style={{
                        fontWeight:'bold',
                        color:"#33c37d",
                        fontSize:20}}>${item.price*item.quantity}</Text>

                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=> this.onChangeQuat(i,false)}>
                          <FontAwesome5 name="minus-circle" size={35} color={"#f9dd7a"} />
                        </TouchableOpacity>
                        <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.quantity}</Text>
                        <TouchableOpacity onPress={()=> this.onChangeQuat(i,true)}>
                          <FontAwesome5 name="plus-circle" size={35} color={"#f9dd7a"} />
                        </TouchableOpacity>
                        
                      </View>
                    </View>

                  </View>
                </View>
              );
            })
          }
           </ScrollView>

          <View style={{height:15}} />
          <Modal
                  visible={this.state.showModal}
                  onRequestClose={() => this.setState({ showModal:false})}
                 >
            <WebView source={{uri: "http://10.139.74.195:3000"}} onNavigationStateChange={data => this.handleResponse(data)}/>
          </Modal>

          <Text style={{fontSize:28, color:"#33c37d",  textAlign:'center',}}>$ {this.onLoadTotal()}</Text>
          <View style={{height:10}} />
         
          <TouchableOpacity style={{
              backgroundColor:"#f9dd7a",
              width:width-40,
              alignItems:'center',
              padding:10,
              borderRadius:5,
              margin:20
            }}
            
             onPress={() => this.setState({ showModal: true})}
            >
              <Text style={{
                fontSize:24,
                fontWeight:"bold",
                color:'white'
              }}>
              CheckOut
            </Text>
            
          </TouchableOpacity>
          
          <View style={{height:20}} />
       
      </View>
      
   </View>
         

          
    );
}

onLoadTotal(){
  var total = 0
  const cart = this.state.dataCart

  for (let i = 0; i < cart.length; i++) {
    total = total + (cart[i].price*cart[i].quantity);
    
  }
  return total
}



onChangeQuat(i,type)
  {
    const cart = this.state.dataCart
    let cantd = cart[i].quantity;

    if (type) {
     cantd = cantd + 1
     cart[i].quantity = cantd
     this.setState({dataCart:cart})
     //pluse 
    }
    else if (type==false&&cantd>=2){
      cantd = cantd - 1
      cart[i].quantity = cantd
      this.setState({dataCart:cart})
    }
    else if (type==false&&cantd==1){
      
      cart.splice(i,1);
      this.setState({dataCart:cart})
      
    }
    
   
  }

  OpenWEB(){
    Linking.openURL('https://localhost:3000');
  }

  
}