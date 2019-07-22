import React, { Component } from 'react';
import {Container, Header, Content, Form, Item, Input, Button, Text, Left, Body, Title, Right} from 'native-base';
import { StyleSheet, AsyncStorage, Image } from 'react-native';
import Profile from "./profile";



export default class Login extends Component {
    //Dit zorgt ervoor dat er op de inlog pagina geen menu is
    static navigationOptions = {
        drawerLockMode: 'locked-open',
        drawerLabel: () => null,
    };
    //Hier bereiden we de states voor
        constructor(props){
            super(props);
            this.state = {
                username: '',
                password: '',
            }
        }
    //Hier zetter we alles klaar voor async storage
        componentDidMount(){
            this._loadInitialState().done();
        }
        //Hier zorgen we voord dat user wordt opgeslagen in de asyncstorage. Zo kunnen we de username laten zien in de profile page.
        _loadInitialState = async () => {

            var value = await AsyncStorage.getItem('user');
            if (value !== null) {
                this.props.navigation.navigate('profile');
            }
        };
    render() {
        return (

       <Container>
           <Content style={styles.content}>
               <Image
                   style={styles.logo}
                   source={require('../../img/HH.png')}
               />
             <Form>
               <Item>
                    <Input
                        placeholder="Gebruikersnaam"
                        onChangeText={(username) => this.setState({username}) } //hier zetten we de input van de username in de state
                    />
               </Item>
               <Item>
                       <Input
                           placeholder="Wachtwoord"
                           onChangeText={(password) => this.setState({password}) }  //hier zetten we de input van de password in de state
                            secureTextEntry={true}
                       />
               </Item>
               <Button style={styles.loginBtn} onPress={this.login}>
                 <Text style={styles.textBtn}>Log in</Text>
               </Button>
             </Form>
           </Content>
         </Container>

     );
    }
    //hier maken we verbinding met de laravel server. Zodat we kunnen inloggen met de credentials. Laravel is nodig om de passwords te lezen aangezien laravel ze ook hashed.
    //ALLES wordt verstuurd met JSON
    login = () => {
        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            //Hier wordt alles van de textinput gezet en verstuurd via JSON.
            body: JSON.stringify({
                "name": this.state.username,
                "password": this.state.password,
            })
        })

            .then((response) => response.json())
            .then ((res) => {
                //Mocht alles kloppen zal de gebruiker worden doorwezen naar de Profile page
                if (res.success === true) {
                    AsyncStorage.setItem('user', res.user);
                    this.props.navigation.navigate('Profile');
                }
                else {
                    alert(res.message);
                }
            })
            .done();
    }
}

const styles = StyleSheet.create({
    loginBtn: {
        width: '65%',
        backgroundColor: '#F8951D',
        alignSelf: 'center',
        marginTop: 60,
    },
    textBtn: {
        textAlign: 'center',
        flex: 1,
    },
    logo: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    content: {
        marginTop: 50
    }
});
