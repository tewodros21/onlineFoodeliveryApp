import React,{ Component, component } from "react";
import {Text, View, TextInput, TouchableOpacity,Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView,{ Marker } from 'react-native-maps';
var { height,width } = Dimensions.get('window');

import Geolocation from '@react-native-community/geolocation';

export default class Address extends Component {

    constructor(props) {
        super(props);
        this.state = {
            module:4,
            latitude:12.600000,
            longitude:37.466667
             
             
        };
    }
    render(){
        return(
            <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
       
         
         <MapView
         style={{width:width, height:height-60}}
          region={{
            latitude:  this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0042,
            longitudeDelta: 0.0121,
          }}
          onPress={(e) => this.onClickMap(e.nativeEvent)}
        >
           
          <MapView.Marker draggable
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            onDragEnd={(e) => this.movementMarker(e.nativeEvent)}
   title="Here"  />
   </MapView>
           <TouchableOpacity style={{
             backgroundColor:"white", 
             boorderRadius:50, 
             height:60,
             width:60,
             padding:5,
             position:"absolute", 
             top:10,right:10
             }} onPress={()=>this.locationUser()}>
            <Ionicons name="md-locate" size={40} color={"red"} /> 
            </TouchableOpacity>

      </View>
    );
  }

  locationUser()
  {
    Geolocation.getCurrentPosition((info) => {
      this.setState({
        latitude: info.coords.latitude,
        latitude: info.coords.longitude,
      })

    },(error)=>{
      
      console.log(JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    })
  }

  movementMarker(e){
    //get coordinate from mapviews
    const {latitude,longitude} = e.coordinate
      //update coordinate
    this.setState({
      latitude: latitude,
      longitude: longitude
    })
  }

  onClickMap(e)
  {
    const {latitude,longitude} = e.coordinate
    this.setState({
      latitude: latitude,
      longitude: longitude
    })
  }
}