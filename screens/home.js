import React, { useState, useEffect } from 'react';
import {
    View, Image, Text, SafeAreaView, TextInput, StyleSheet,
    Linking, TouchableHighlight, FlatList, RefreshControl
} from 'react-native';
import { Link, useIsFocused } from '@react-navigation/native';
import api from '../services/fetchcontacts';

const Home = () => {
    const [filterdData, setfilterdData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            api.get("/api/apiappphonebook").then(function (response) {
                // console.log(response.data);
                setfilterdData(response.data);
                setmasterData(response.data)
            }).catch(function (response) {
                console.log(response);
            });
        }
    }, [isFocused]);

    const getContacts = () => {
        api.get("/api/apiappphonebook").then(function (response) {
            // console.log(response.data);
            setfilterdData(response.data);
            setmasterData(response.data)
        }).catch(function (response) {
            console.log(response);
        });
    }

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = (item.username + item.empresa + item.email + item.nmr_telemovel + item.nmr_escritorio + item.nmr_casa).toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilterdData(newData);
            setSearch(text);
        } else {
            setfilterdData(masterData);
            setSearch(text);
        }
    }

    const ItemView = ({ item }) => {
        return (
            <View style={styles.allList} key={item.id}>
                <View>
                    <Text style={styles.listItemContacts}>
                        <Link to={{ screen: 'Details', params: { id: item.id, username: item.username, email: item.email, prinome: item.pri_nome, apelido: item.apelido, telemovel: item.nmr_telemovel, escritorio: item.nmr_escritorio, telefone: item.nmr_casa, notas: item.notas } }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', }}>
                                {item.username}{" "}
                            </Text>
                        </Link>
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, zIndex: 100 }}>
                        <Text onPress={() => { Linking.openURL(`tel:${item.nmr_telemovel}`); }} style={{ fontSize: 12, color: 'grey' }}>
                            {item.nmr_telemovel}{" "}
                        </Text>
                        <Text>  </Text>
                        <Text onPress={() => { Linking.openURL(`tel:${item.nmr_escritorio}`); }} style={{ fontSize: 12, color: 'grey' }}>
                            {item.nmr_escritorio}{" "}
                        </Text>
                    </View>
                </View>

                <View style={styles.imagemStilo}>
                    <View style={styles.containerImagens}>
                        {!item.nmr_telemovel ? (<Text>{""}</Text>) :
                            (<TouchableHighlight onPress={() => { Linking.openURL(`tel:${item.nmr_telemovel}`); }}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={require('../src/imgs/mobile-regular-24.png')}
                                />
                            </TouchableHighlight>
                            )
                        }
                        {!item.nmr_escritorio ? (<Text>{""}</Text>) :
                            (<TouchableHighlight onPress={() => { Linking.openURL(`tel:${item.nmr_escritorio}`); }}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={require('../src/imgs/phone-solid-24.png')}
                                />
                            </TouchableHighlight>
                            )
                        }
                        <TouchableHighlight>
                            <Link to={{ screen: 'Details', params: { id: item.id, username: item.username, email: item.email, empresa: item.empresa, prinome: item.pri_nome, apelido: item.apelido, telemovel: item.nmr_telemovel, escritorio: item.nmr_escritorio, telefone: item.nmr_casa, notas: item.notas, favorito: item.favorito } }}>
                                <Image
                                    style={styles.tinyLogoFirst}
                                    source={require('../src/imgs/info-circle-regular-24.png')}
                                />
                            </Link>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }

    const ItemSeparatorView = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }}></View>
        )
    }

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getContacts();
        wait(500).then(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'auto', justifyContent: 'space-between' }}>
                    <TextInput
                        style={styles.textInputStyle}
                        value={search}
                        placeholder="Pesquisar Contactos"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => searchFilter(text)}
                    />
                    <Link to={{ screen: 'Create' }} style={{ alignSelf: 'center', marginRight: 20 }}>
                        <Image style={{ width: 35, height: 35 }}
                            source={require('../src/imgs/user-plus-regular-24.png')} />
                    </Link>
                </View>
                <FlatList
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    data={filterdData}
                    keyExtractor={({ id }, index) => id}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        marginBottom: 150,
    },
    contactos: {
        flexDirection: 'row',
        paddingVertical: 15,
        marginLeft: 10,
    },
    textInputStyle: {
        height: 50,
        width: '80%',
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: 'white',
    },
    // Imagens
    tinyLogo: {
        width: 23,
        height: 23,
        marginRight: 15,
    },
    containerImagens: {
        flexDirection: 'row',
        marginVertical: 'auto',
        justifyContent: 'flex-end',
        maxWidth: 100,
    },
    // Linha
    allList: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
    },
});

export default Home;