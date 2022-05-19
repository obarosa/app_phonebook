import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, Linking, Image, Button, Alert } from 'react-native';
import { Link } from '@react-navigation/native';
import api from '../services/fetchcontacts';

const Details = ({ navigation, route }) => {

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
                        <TouchableHighlight style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', marginTop:10}}>
                            <Link to={{ screen: 'Edit', params: { id: route.params.id, username: route.params.username, email: route.params.email, prinome: route.params.prinome, apelido: route.params.apelido, telemovel: route.params.telemovel, escritorio: route.params.escritorio, telefone: route.params.telefone, notas: route.params.notas } }}>
                                <Text style={{ fontSize: 18, color:"green" }}>Editar</Text>
                            </Link>
                        </TouchableHighlight>
                    </View>
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
});

export default Details;