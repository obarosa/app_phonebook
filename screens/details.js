import React, { useState } from 'react';
import {
    StyleSheet, Text, ScrollView, View, TouchableHighlight,
    Linking, Button, Alert, Modal, Pressable
} from 'react-native';
import { Link } from '@react-navigation/native';
import QRCode from "react-native-qrcode-svg";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons/faMobileScreenButton'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faQrcode } from '@fortawesome/free-solid-svg-icons/faQrcode'

const Details = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [vcardUsername] = useState(route.params.username);
    const vcardPrinome = vcardUsername.split(' ')[0];
    var vcardApelido = vcardUsername.split(' ')[1];
    if (vcardApelido == undefined) {
        vcardApelido = ''
    }
    var vcardEmpresa = route.params.empresa;
    if (vcardEmpresa == undefined) {
        vcardEmpresa = ''
    }
    var vcardTelemovel = route.params.telemovel;
    if (vcardTelemovel == null) {
        vcardTelemovel = ''
    }
    var vcardEscritorio = route.params.escritorio;
    if (vcardEscritorio == null) {
        vcardEscritorio = ''
    }

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
        axios.post(`/api/dashboard/admin/delete/${route.params.id}`)
            .then(function (response) {
                Alert.alert('Apagou o Contacto!', '', [{
                    text: "OK", onPress: () => navigation.navigate('Home')
                }])
            }).catch(function (error) {
                Alert.alert('Erro ao Apagar o Contacto!', '', [{
                    text: "OK", onPress: () => navigation.navigate('Home')
                }])
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
                            <FontAwesomeIcon icon={faEnvelope} color={'#043c84'} style={{ marginLeft: 15 }} size={22} />
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
                                <FontAwesomeIcon icon={faMobileScreenButton} color={'#043c84'} style={{ marginLeft: 10 }} size={22} />
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
                                <FontAwesomeIcon icon={faPhone} color={'#043c84'} style={{ marginLeft: 10 }} size={22} />
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
                                <FontAwesomeIcon icon={faPhone} color={'#043c84'} style={{ marginLeft: 10 }} size={22} />
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
                    <View style={styles.separatorLines2}></View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>VCard QRCode:</Text>
                        <Pressable
                            onPress={() => setModalVisible(true)}
                        >
                            <FontAwesomeIcon icon={faQrcode} color={'#043c84'} style={{ marginLeft: 15 }} size={22} />
                        </Pressable>
                    </View>
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
                                        { data: `N:${vcardApelido};${vcardPrinome};;;\n` },
                                        { data: `ORG:${vcardEmpresa}\n` },
                                        { data: `TEL;TYPE=CELL:${vcardTelemovel}\n` },
                                        { data: `TEL;TYPE=WORK:${vcardEscritorio}\n` },
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
    separatorLines2: {
        height: 0.5,
        width: '100%',
        backgroundColor: 'black',
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