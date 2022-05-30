import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, Modal, Pressable, TextInput, Alert, DevSettings } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useBus } from 'react-bus'
import axios from 'axios';

const ModalHeader = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [myApi, setMyApi] = useState('http://192.168.150.27:9999/');
    const isFocused = useIsFocused();
    const bus = useBus()

    const closeModal = () => {
        setModalVisible(!modalVisible);
    }
    const storeData = async () => {
        try {
            await AsyncStorage.setItem("MyApi", myApi)
            axios.defaults.baseURL = myApi;
            Alert.alert('Alterações efetuadas!', '', [{
                text: "OK", onPress: () => {
                    bus.emit('refreshyau');
                    setModalVisible(!modalVisible);
                }

            }])
        } catch (e) {
            console.log(e)
        }
    }

    const getData = async () => {
        try {
            var value = await AsyncStorage.getItem("MyApi")
            if (value !== null) {
                setMyApi(value)
            }

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (isFocused) {
            getData()
        }
    }, [isFocused])

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView2}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>API URL:</Text>
                        <TextInput
                            style={styles.input}
                            value={myApi}
                            onChangeText={(text) => setMyApi(text)}
                            placeholder="Api Url"
                        />
                        <View style={styles.modalFooter}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => closeModal()}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => storeData()}
                            >
                                <Text style={styles.textStyle}>Alterar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable
                onPress={() => setModalVisible(true)}
            >
                <Image
                    style={{ width: 26, height: 26 }}
                    source={require('../src/imgs/cog-regular-24.png')}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "flex-end",
        alignItems: "center",
    },
    centeredView2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 25,
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
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold',
    },
    modalFooter: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "green",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    input: {
        height: 40,
        marginRight: 12,
        marginBottom: 12,
        marginLeft: 12,
        borderWidth: 1,
        borderColor: '#000099',
        padding: 10,
        width: 230,
    },
});

export default ModalHeader; 