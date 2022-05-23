import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, Linking, Image, Button, Alert, Modal, Pressable } from 'react-native';
import { Link } from '@react-navigation/native';
import QRCode from "react-native-qrcode-svg";
import api from '../services/fetchcontacts';

const Details = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [vcardUsername] = useState(route.params.username);
    const [vcardPrinome] = useState(route.params.prinome);
    const [vcardTelemovel] = useState(route.params.telemovel);

    const confirmDelete = () =>
        Alert.alert(
            "Pretende eliminar este Contacto?",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteContact() }
            ]
        );

    const deleteContact = () => {
        api.post(`/api/dashboard/admin/delete/${route.params.id}`)
            .then(function (response) {
                Alert.alert('Apagou o Contacto!', '', [{
                    text: "OK", onPress: () => navigation.navigate('Home')
                }])
            }).catch(function (error) {
                console.log(error)
            })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.contactsWrapper}>
                <View style={{ paddingHorizontal: 10, maxWidth: '95%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Username:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.username}</Text>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            E-mail:
                        </Text>
                        <Text onPress={() => { Linking.openURL(`mailto:${route.params.email}`); }} style={{ marginLeft: 10, }}>
                            {route.params.email}
                        </Text>
                        <TouchableHighlight onPress={() => { Linking.openURL(`mailto:${route.params.email}`); }}>
                            <Image
                                style={{ marginLeft: 20, }}
                                source={require('../src/imgs/mail-send-regular-24.png')}
                            />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Empresa:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.empresa}</Text>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Primeiro Nome:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.prinome}</Text>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Apelido:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.apelido}</Text>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Nº Telemóvel:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.telemovel}</Text>
                        {!route.params.telemovel ? (<Text>{""}</Text>) :
                            (<TouchableHighlight onPress={() => { Linking.openURL(`tel:${route.params.telemovel}`); }}>
                                <Image
                                    style={{ marginLeft: 10, }}
                                    source={require('../src/imgs/mobile-regular-24.png')}
                                />
                            </TouchableHighlight>
                            )
                        }
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Nº Telefone Escritório:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.escritorio}</Text>
                        {!route.params.escritorio ? (<Text>{""}</Text>) :
                            (<TouchableHighlight onPress={() => { Linking.openURL(`tel:${route.params.escritorio}`); }}>
                                <Image
                                    style={{ marginLeft: 10, }}
                                    source={require('../src/imgs/phone-solid-24.png')}
                                />
                            </TouchableHighlight>
                            )
                        }
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Nº Casa:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.telefone}</Text>
                        {!route.params.telefone ? (<Text>{""}</Text>) :
                            (<TouchableHighlight onPress={() => { Linking.openURL(`tel:${route.params.telefone}`); }}>
                                <Image
                                    style={{ marginLeft: 10, }}
                                    source={require('../src/imgs/phone-solid-24.png')}
                                />
                            </TouchableHighlight>
                            )
                        }
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Notas:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.notas}</Text>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={styles.fixToText}>
                        <Button
                            title="Apagar"
                            onPress={() => confirmDelete()}
                            color="red"
                        />
                        <TouchableHighlight style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', marginTop: 10 }}>
                            <Link to={{ screen: 'Edit', params: { id: route.params.id, username: route.params.username, email: route.params.email, empresa: route.params.empresa, prinome: route.params.prinome, apelido: route.params.apelido, telemovel: route.params.telemovel, escritorio: route.params.escritorio, telefone: route.params.telefone, notas: route.params.notas, favorito: route.params.favorito } }}>
                                <Text style={{ fontSize: 18, color: "green" }}>Editar</Text>
                            </Link>
                        </TouchableHighlight>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Image
                            style={{ marginLeft: 10, }}
                            source={require('../src/imgs/qr-regular-24.png')}
                        />
                    </Pressable>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <QRCode
                                    value={[
                                        { data: `BEGIN:VCARD\n` },
                                        { data: 'VERSION:3.0\n' },
                                        { data: `FN:${vcardUsername}\n` },
                                        { data: `N:${route.params.apelido};${vcardPrinome};;;\n` },
                                        { data: `ORG:${route.params.empresa}\n` },
                                        { data: `TEL;CELL:${vcardTelemovel}\n` },
                                        { data: `TEL;TYPE=WORK:${route.params.escritorio}\n` },
                                        { data: `EMAIL:${route.params.email}\n` },
                                        { data: `END:VCARD` }
                                    ]}
                                    size={200}
                                />
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    contactsWrapper: {
        marginVertical: 10,
        marginHorizontal: 15,
        padding: 10,
    },
    separatorLines: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#c8c8c8',
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
    },
    //Modal
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 7,
        marginTop: 15,
        marginBottom: -20,
        elevation: 2,
    },
    // buttonOpen: {
    //     backgroundColor: "#F194FF",
    // },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default Details;