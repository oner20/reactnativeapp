import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Thumbnail } from 'native-base';
import { StyleSheet, Image, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator,
    DrawerItems,
} from 'react-navigation';
import Login from './app/components/login';
import Profile from './app/components/profile';
import Signature from './app/components/signature';
import Succes from './app/components/succes';

//Dit is de drawer component. Het is eigenlijk de hamburgen menu van de app.
const CustomDrawComponent = (props) => (
    <SafeAreaView >
        <View>
            <Image style={{alignSelf: 'center', marginTop: 15, marginBottom: 15}} source={require('./img/HHnav.png')}/>
        </View>
        <ScrollView>
            <DrawerItems {...props} labelStyle={{ color: 'orange', fontSize: 20, fontWeight: '300'}}/>
        </ScrollView>
    </SafeAreaView>
);

//Hier creeren we de items voor de navigator, alles wat hierin wordt gezet zal automatisch in de Drawer component komen
const RootStack = createDrawerNavigator(
    {
        Login,
        Profile,
        Signature,
        Succes,
    },
    {
        contentComponent: CustomDrawComponent,
        headerMode: 'none',
        mode: 'modal',
        //hier halen we de left swipe weg voor iPhones
        defaultNavigationOptions: {
            gesturesEnabled: false,
        },
    }


);
const Application = createAppContainer(RootStack);

export default class App extends Component {
  render() {
      return (
          <Application/>
      );
  }
}

