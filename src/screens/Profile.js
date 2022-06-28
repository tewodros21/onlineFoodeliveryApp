import React, { Component,useEffect, useState} from "react";
import {StyleSheet, View, Button,StatusBar,Text } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import database from '@react-native-firebase/database'

export default class ButtonBasics extends Component {
  state ={
    users: []
  }
  constructor(props) {
      super(props);
      this.subscriber = 
        firestore()
        .collection("users")
        .onSnapshot(docs =>{
           let users = []
           docs.forEach(doc =>{
             users.push(doc.data())
           })
          this.setState({ users })
          console.log(users)
        })
    }

    addRu = async () => {
      let name = Math.random().toString(36).substring(7)
      firestore().collection('users').add({
        name,
        age:20
      })
    }
    

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {this.state.users.map((user,index ) => <View key={index}>
            <Text>{user.name}</Text>
            </View>
            )}
        </View>   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  
});
