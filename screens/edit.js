import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, Button, Alert } from 'react-native';
import api from '../services/fetchcontacts';

const EditScreen = ({ navigation, route }) => {

    const [username, onChangeUsername] = useState(route.params.username);

    const [nome, onChangeNome] = useState(route.params.prinome);
    const [apelido, onChangeApelido] = useState(route.params.apelido);
    const [email, onChangeEmail] = useState(route.params.email);
    const [empresa, onChangeEmpresa] = useState(route.params.empresa);
    const [telemovel, onChangeTelemovel] = useState(route.params.telemovel);
    const [escritorio, onChangeEscritorio] = useState(route.params.escritorio);
    const [telefone, onChangeTelefone] = useState(route.params.telefone);
    const [notas, onChangeNotas] = useState(route.params.notas);
    const [favorito] = useState(route.params.favorito)
    const [tipo] = useState("Nenhum");
    const [grupo] = useState("Nenhum");
    const [usarNmrTelemovel] = useState(0);
    const [usarNmrEscritorio] = useState(0);

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

    const editContacto = () => {
        api.post(`/api/dashboard/admin/update/${route.params.id}`, {
            username,
            pri_nome: nome,
            apelido,
            email,
            empresa,
            nmr_telemovel: telemovel,
            nmr_escritorio: escritorio,
            nmr_casa: telefone,
            tipo,
            grupo,
            favorito,
            usaNmrTelemovel: usarNmrTelemovel,
            usaNmrTlfEscrt: usarNmrEscritorio,
            notas,
        }).then(function (response) {
            Alert.alert('Editou o Contacto!', '', [{
                text: "OK", onPress: () => navigation.navigate('Home')
            }])
            console.log('THEN do EDITAR')
        }).catch(function (error) {
            console.log('CATCH do EDITAR')
            console.log(error)
        })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.contactsWrapper}>
                <View style={{ paddingHorizontal: 10, flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, width: 230 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Username:
                        </Text>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeUsername}
                                value={username}
                                placeholder="Username"
                            />
                        </View>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, width: 260 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            E-mail:
                        </Text>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeEmail}
                                value={email}
                                keyboardType='email-address'
                                placeholder="Email"
                            />
                        </View>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, width: 245 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Empresa:
                        </Text>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeEmpresa}
                                value={empresa}
                                placeholder="Empresa"
                            />
                        </View>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, width: 200 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Primeiro Nome:
                        </Text>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeNome}
                                value={nome}
                                placeholder="Primeiro Nome"
                            />
                        </View>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, width: 255 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Apelido:
                        </Text>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeApelido}
                                value={apelido}
                                placeholder="Apelido"
                            />
                        </View>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, width: 215 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Nº Telemóvel:
                        </Text>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeTelemovel}
                                value={telemovel}
                                keyboardType='number-pad'
                                placeholder="Nº Telemóvel"
                            />
                        </View>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, width: 220 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Nº Escritório:
                        </Text>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeEscritorio}
                                value={escritorio}
                                keyboardType='number-pad'
                                placeholder="Nº Telefone Escritório"
                            />
                        </View>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, width: 255 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Nº Casa:
                        </Text>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeTelefone}
                                value={telefone}
                                keyboardType='number-pad'
                                placeholder="Nº Telefone Casa"
                            />
                        </View>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, width: 270 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                            Notas:
                        </Text>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeNotas}
                                value={notas}
                                placeholder="Notas"
                            />
                        </View>
                    </View>
                    <View style={styles.separatorLines}></View>
                    <View style={styles.fixToText}>
                        <Button
                            title="Apagar"
                            onPress={() => confirmDelete()}
                            color="red"
                        />
                        <Button title="Confirmar Alterações" onPress={() => editContacto()} />
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
        maxWidth: '95%',
    },
    contactsWrapper: {
        marginVertical: 10,
        padding: 10,
    },
    separatorLines: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#c8c8c8',
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    input: {
        borderWidth: 0.5,
        marginLeft: 10,
        padding: 5,
    },
});

export default EditScreen;