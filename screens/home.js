import React, { useState, useEffect } from 'react';
import {
    View, Image, Text, SafeAreaView, TextInput, StyleSheet,
    Linking, TouchableHighlight, FlatList, RefreshControl, Alert
} from 'react-native';
import { useListener } from 'react-bus'
import { Link, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons/faMobileScreenButton'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus'

const Home = () => {
    const [filterdData, setfilterdData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            axios.get("/api/apiappphonebook").then(function (response) {
                setfilterdData(response.data);
                setmasterData(response.data);
            }).catch(function (error) {
                if (!error.status) {
                    console.log(error);
                    setfilterdData([])
                    Alert.alert('API incorreta!')
                }
            });
        }
    }, [isFocused]);

    const getContacts = () => {
        axios.get("/api/apiappphonebook").then(function (response) {
            setfilterdData(response.data);
            setmasterData(response.data)
        }).catch(function (response) {
            console.log(response);
            setfilterdData([])
        });
    }

    useListener('refreshyau', getContacts);

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
            <View style={styles.allList}>
                <View key={item.id}>
                    <Link style={styles.allList2} to={{ screen: 'Details', params: { id: item.id, username: item.username, email: item.email, prinome: item.pri_nome, apelido: item.apelido, telemovel: item.nmr_telemovel, escritorio: item.nmr_escritorio, telefone: item.nmr_casa, notas: item.notas } }}>
                        <View style={{ minWidth: 220 }}>
                            <Text style={styles.listItemContacts}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', }}>
                                    {item.username}{" "}
                                </Text>
                            </Text>
                            <View style={{ flexDirection: 'row', marginTop: 5, zIndex: 100 }}>
                                <Text style={{ fontSize: 12, color: 'grey' }}>
                                    {item.nmr_telemovel}{" "}
                                </Text>
                                <Text>  </Text>
                                <Text style={{ fontSize: 12, color: 'grey' }}>
                                    {item.nmr_escritorio}{" "}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.containerImagens}>
                            {!item.nmr_telemovel ? (<Text>{""}</Text>) :
                                (<TouchableHighlight onPress={() => { Linking.openURL(`tel:${item.nmr_telemovel}`); }}>
                                    <FontAwesomeIcon icon={faMobileScreenButton} color={'#043c84'} style={styles.icon} size={22} />
                                </TouchableHighlight>
                                )
                            }
                            {!item.nmr_escritorio ? (<Text>{""}</Text>) :
                                (<TouchableHighlight onPress={() => { Linking.openURL(`tel:${item.nmr_escritorio}`); }}>
                                    <FontAwesomeIcon icon={faPhone} color={'#043c84'} style={styles.icon} size={22} />
                                </TouchableHighlight>
                                )
                            }
                            <TouchableHighlight style={styles.boxIcon}>
                                <Link to={{ screen: 'Details', params: { id: item.id, username: item.username, email: item.email, empresa: item.empresa, prinome: item.pri_nome, apelido: item.apelido, telemovel: item.nmr_telemovel, escritorio: item.nmr_escritorio, telefone: item.nmr_casa, notas: item.notas, favorito: item.favorito } }}>
                                    <FontAwesomeIcon icon={faCircleInfo} color={'#043c84'} style={{}} size={24} />
                                </Link>
                            </TouchableHighlight>
                        </View>
                    </Link>
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
                <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center' }}>
                    <TextInput
                        style={styles.textInputStyle}
                        value={search}
                        placeholder="Pesquisar Contactos"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => searchFilter(text)}
                    />
                    <Link to={{ screen: 'Create' }} style={{ alignSelf: 'auto', justifyContent: 'center', margin: 14 }}>
                        <FontAwesomeIcon icon={faUserPlus} color={'black'} style={{}} size={30} />
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
        maxWidth: '100%',
        marginBottom: 120,
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
    containerImagens: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'blue',
    },
    icon: {
        paddingHorizontal: 20,
    },
    boxIcon: {
        marginTop: 1.5,
        marginLeft: 10,
    },
    // Linha
    allList: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        paddingRight: 20,
    },
    allList2: {
        display:'flex',
        flexDirection:'row',
        backgroundColor: 'yellow',
    },
});

export default Home;