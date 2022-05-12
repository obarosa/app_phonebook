import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, Linking, Button, Image, } from 'react-native';

const Details = ({ route }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.contactsWrapper}>
                <View style={{ paddingHorizontal: 15, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Username:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.username}</Text>
                    </View>
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
                                source={require('C:/Estagio/appphonebook_v2/src/imgs/mail-send-regular-24.png')}
                            />
                        </TouchableHighlight>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Primeiro Nome:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.prinome}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Apelido:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.apelido}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Número Telemóvel:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.telemovel}</Text>
                        <TouchableHighlight onPress={() => { Linking.openURL(`tel:${route.params.telemovel}`); }}>
                            <Image
                                style={{ marginLeft: 10, }}
                                source={require('C:/Estagio/appphonebook_v2/src/imgs/mobile-regular-24.png')}
                            />
                        </TouchableHighlight>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Nº Telefone Escritório:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.escritorio}</Text>
                        <TouchableHighlight onPress={() => { Linking.openURL(`tel:${route.params.escritorio}`); }}>
                            <Image
                                style={{ marginLeft: 10, }}
                                source={require('C:/Estagio/appphonebook_v2/src/imgs/phone-solid-24.png')}
                            />
                        </TouchableHighlight>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Número Casa:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.telefone}</Text>
                        {!route.params.telefone ? (<Text>{""}</Text>) :
                            (<TouchableHighlight onPress={() => { Linking.openURL(`tel:${route.params.telefone}`); }}>
                                <Image
                                    style={{ marginLeft: 10, }}
                                    source={require('C:/Estagio/appphonebook_v2/src/imgs/phone-solid-24.png')}
                                />
                            </TouchableHighlight>
                            )
                        }
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Notas:
                        </Text>
                        <Text style={{ marginLeft: 10, }}>{route.params.notas}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6C63FF',
    },
    contactsWrapper: {
        marginVertical: 80,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: '#FFFF',
        borderRadius: 10,
    },
});

export default Details;