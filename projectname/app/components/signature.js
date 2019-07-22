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
    CheckBox,
    ListItem
} from 'native-base';
import {StyleSheet, Image, View, AsyncStorage, AppRegistry, TouchableHighlight} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

export default class RNSignatureExample extends Component {
    static navigationOptions = {
        drawerLabel: () => 'Ondertekenen',
    };
    
    render() {
        return (
            <Container>
                <Header>

                    <Icon style={styles.icon} name="menu" onPress={()=>this.props.navigation.openDrawer()}/>

                    <Left/>
                    <Body>
                    <Title style={styles.Header}>Ondertekenen</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content style={styles.content}>

                    <Image
                        style={styles.img}
                        source={require('../../img/HHklein.png')}
                    />
                </Content>

            <View style={{ flex: 1, }}>
                <Text style={{alignItems:"center",justifyContent:"center"}}>Zet hier je handtekening (TEST)</Text>
                <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}></SignatureCapture>

                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableHighlight style={styles.buttonStyle}
                                        onPress={() => { this.saveSign() } } >
                        <Text>Save</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.buttonStyle}
                                        onPress={() => { this.resetSign() } } >
                        <Text>Reset</Text>
                    </TouchableHighlight>
                </View>

            </View>
                <ListItem>
                    <CheckBox />
                    <Text>Test</Text>
                </ListItem>
            </Container>
        );
    }

    saveSign() {
        this.refs["sign"].saveImage();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        console.log(result);
    }
    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }
}

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    },
    Header: {
        color: '#006DA4',
        fontWeight: "400",
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginRight: 35,
        width: 120,
    },
    img: {
        alignSelf: 'center',
        marginTop: 20,

    },
    icon: {
        color: '#006DA4',
        marginLeft: 10,
        marginTop: 5,
    }
});

AppRegistry.registerComponent('RNSignatureExample', () => RNSignatureExample);
