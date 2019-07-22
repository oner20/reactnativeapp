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
    Icon
} from 'native-base';
import {StyleSheet, Image, View, AsyncStorage} from 'react-native';
import {
    createAppContainer,
    createDrawerNavigator
} from 'react-navigation';


export default class Profile extends Component {
    static navigationOptions = {
        drawerLabel: () => 'Algemene gegevens',
    };
    state = {
        username: [],
    }

    componentDidMount() {
        this._loadInintialState().done();
    }

    _loadInintialState = async () => {
        var value = await AsyncStorage.getItem('user');
        if (value !== null) {
            this.setState({username: value});
        }

    }

    render() {
        return (
            <Container>
                <Header>

                        <Icon style={styles.icon} name="menu" onPress={()=>this.props.navigation.openDrawer()}/>

                    <Left/>
                     <Body>
                         <Title style={styles.Header}>Home</Title>
                     </Body>
                    <Right/>
                </Header>
                <Content style={styles.content}>

                    <Image
                        style={styles.img}
                        source={require('../../img/HHklein.png')}
                    />

                    <Text
                        style={styles.text}>Welkom {this.state.username},
                    </Text>

                    <Button style={styles.inspectBtn}>
                        <Text style={styles.textBtn}>Inspecteer nieuw object</Text>
                    </Button>

                    <Text
                        style={styles.overzichtText}>Overzicht inspectierapporten
                    </Text>
                </Content>
                <View style={styles.flex}>
                    <Text style={styles.loguit}
                        >Ingelogd als {this.state.username},
                    </Text>

                    <Text
                        style={styles.loguitHref}
                        onPress={this.logout}> log uit
                    </Text>
                </View>
            </Container>
        );
    }

    logout = () => {
        this.state.username = null;
        this.state.password = null;
        this.props.navigation.navigate('Login');
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#006DA4',
        alignSelf: 'center',
    },
    flex: {
        flexDirection: 'row',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        marginBottom: 50,
    },
    loguit: {
        color: 'grey',
        fontWeight: "200",
        fontSize: 14,
    },
    loguitHref: {
        color: 'grey',
        fontWeight: "200",
        fontSize: 14,
        textDecorationLine: "underline",
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
        marginTop: 30,
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
    }
});
