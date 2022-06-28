import React, {useEffect} from 'react';
import {Colors, Images, Fonts } from '../constants'
import { View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import { Display } from '../utils';

const SplashScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
          navigation.navigate('Welcome');
        }, 1500);
      }, []);
    
    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" 
             backgroundColor={Colors.DEFAULT_GREEN}
             translucent
             />
            <Image
             source={Images.PLATE} resizeMethod="auto" style={styles.image}
            />
            <Text style={styles.titleText}>OrdreNow</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:Colors.DEFAULT_GREEN,
    },
    image:{
        height: Display.setHeight(30),
        width: Display.setWidth(60),
    },
    titleText:{
        color: Colors.DEFAULT_WHITE,
        fontSize: 32,
        fontFamily: Fonts.POPPINS_LIGHT
    }

});

export default SplashScreen;