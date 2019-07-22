import React, {Component} from 'react';
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Button,
    Text,
    Thumbnail,
    Title,
    Left,
    Right,
    Body,
    Icon,
    Animated,
    ImageLoader
} from 'native-base';
import {StyleSheet, Image, View, AsyncStorage} from 'react-native';
import {
    createAppContainer,
    createDrawerNavigator
} from 'react-navigation';



export default class Profile extends Component {
    static navigationOptions = {
        drawerLabel: () => 'Bedankt pagina',
    };

    render() {
        return (
            <Container>
                <Header>

                        <Icon style={styles.icon} name="menu" onPress={()=>this.props.navigation.openDrawer()}/>

                    <Left/>
                     <Body>
                         <Title style={styles.Header}>Bedankt!</Title>
                     </Body>
                    <Right/>
                </Header>
                <Content style={styles.content}>
                <Image
                        style={styles.img}
                        source={require('../../img/HHklein.png')}
                    />
                <Text
                        style={styles.text}>Goed gedaan!
                    </Text>
                </Content>
                <Button style={styles.inspectBtn}>
                        <Text style={styles.textBtn}>Inspecteer nieuw object</Text>
                    </Button>
            </Container>
        );
    }

    logout = () => {
        this.state.username = null;
        this.state.password = null;
        this.props.navigation.navigate('Login');
    }


        state = {
          opacity: new Animated.Value(0),
        }
      
        onLoad = () => {
          Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      
        render() {
          return (
            <Animated.Image
              onLoad={this.onLoad}
              {...this.props}
              style={[
                {
                  opacity: this.state.opacity,
                  transform: [
                    {
                      scale: this.state.opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.85, 1],
                      })
                    },
                  ],
                },
                this.props.style,
              ]}
            />
          );
        }
      }
      
      const App = () => (
        <View style={styles.container}>
          <ImageLoader
            style={styles.image}
            source={{ uri: 'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D' }}
          />
        </View>
      );
      




const styles = StyleSheet.create({
    text: {
        color: '#006DA4',
        alignSelf: 'center',
    },
    img: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    inspectBtn: {
        width: '65%',
        backgroundColor: '#F8951D',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        marginBottom: 100
    },
    textBtn: {
        textAlign: 'center',
        flex: 1,
    },
    Header: {
        color: '#006DA4',
        fontWeight: "400",
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginRight: 35
    },
    overzichtText: {
        color: '#006DA4',
        marginTop: 30,
        marginLeft: 15,
    },
    icon: {
        color: '#006DA4',
        marginLeft: 10,
        marginTop: 5,
    },
    img: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
});
