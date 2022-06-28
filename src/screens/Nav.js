import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
//import styled from 'styled-components';
var { width } = Dimensions.get("window")

// import Components
import HomeScreen from "./HomeScreen";
import Cart from "./Cart";
import Address from "./Address";
import Profile from "./Profile"



console.disableYellowBox = true;
// import icons
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Nav extends Component {

  constructor(props) {
     super(props);
     this.state = {
        module:1
     };
  } 

  render() {
    return (
      <View style={{flex:1}}>
         {
           this.state.module==1? <HomeScreen />
          :this.state.module==2? <Address />
          :this.state.module==3? <Cart />
          :<Profile />
         }

         
         <View style={styles.bottomTab}>
         
           <TouchableOpacity onPress={()=>this.setState({module:1})}>
            <View style={styles.itemTab}>
              <Icon name="utensils" size={30} color={this.state.module==1?"#f9dd7a":"gray"}></Icon>
              <Text>
                Food
              </Text>
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>this.setState({module:3})}>
            <View style={styles.itemTab}>
              <Icon name="shopping-cart" size={30} color={this.state.module==3?"#f9dd7a":"gray"}></Icon>
              <Text>
                Cart
              </Text>
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>this.setState({module:2})}>
            <View style={styles.itemTab}>
              <Icon name="map" size={30} color={this.state.module==2?"#f9dd7a":"gray"}></Icon>
              <Text>
                Address
              </Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.setState({module:4})}>
            <View style={styles.itemTab}>
              <Icon name="user-circle" size={30} color={this.state.module==4?"#f9dd7a":"gray"}></Icon>
              <Text>
                Profile
              </Text>
            </View>
            </TouchableOpacity>
         </View>
         </View>
    );
  }
}

const styles = StyleSheet.create ({
  bottomTab:{
    width:width, 
    backgroundColor:"gray",
    height:60, 
    flexDirection:'row',
    shadowOpacity:0.3,
    shadowRadius:50
  },
  itemTab:{
    width:width/4, 
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    height:70
    

  }
  
})

//const RecipeBackground = styled.ImageBackground`

  //  width: 100%;

//`;