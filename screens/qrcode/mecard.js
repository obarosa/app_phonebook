import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, View, Text, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link } from '@react-navigation/native';

import api from '../../services/fetchcontacts';

const CreateMecard = ({ navigation, route }) => {

    const [username, onChangeUsername] = useState(route.params.username);
    const [nome, onChangeNome] = useState(route.params.priNome);
    const [apelido, onChangeApelido] = useState(route.params.apelido);
    const [email, onChangeEmail] = useState(route.params.email);
    const [telemovel, onChangeTelemovel] = useState(route.params.telemovel);
    const [escritorio, onChangeEscritorio] = useState(route.params.escritorio);
    const [tipo, setTipo] = useState("Nenhum");
    const [grupo] = useState("Nenhum");
    const [notas, onChangeNotas] = useState('');

    const [usarNmrTelemovel] = useState(0);
    const [usarNmrEscritorio] = useState(0);

    const postContacto = () => {
        api.post("/api/dashboard/admin/save", {
            username,
            firstName: nome,
            lastName: apelido,
            email,
            nmrTelemovel: telemovel,
            nmrEscritorio: escritorio,
            tipo,
            grupo,
            usaNmrTelemovel: usarNmrTelemovel,
            usaNmrTlfEscrt: usarNmrEscritorio,
            notas,
        }).then(function (response) {
            Alert.alert(
                "Contacto Adicionado!",
                "",
                [
                    {
                        text: "Voltar", onPress: () => navigation.navigate('Home'),
                        style: "cancel"
                    },
                    { text: "Criar Outro", onPress: () => navigation.navigate('Create') }
                ]
            );
            console.log('DADOS ENVIADOS COM ALERTA');
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, maxWidth: '95%', }}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Username"
            />
            <Text style={styles.obrigatorio}>Obrigatório</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                keyboardType='email-address'
                placeholder="E-mail"
            />
            <Text style={styles.obrigatorio}>Obrigatório</Text>
            <View style={{ display: 'flex', flexDirection: 'row', width: '102%' }}>
                <TextInput
                    style={styles.input2}
                    onChangeText={onChangeNome}
                    value={nome}
                    placeholder="Primeiro Nome"
                />
                <TextInput
                    style={styles.input3}
                    onChangeText={onChangeApelido}
                    value={apelido}
                    placeholder="Apelido"
                />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', width: '102%' }}>
                <TextInput
                    style={styles.input2}
                    onChangeText={onChangeTelemovel}
                    value={telemovel}
                    keyboardType='number-pad'
                    placeholder="Nº Telemóvel"
                />
                <TextInput
                    style={styles.input3}
                    onChangeText={onChangeEscritorio}
                    value={escritorio}
                    keyboardType='number-pad'
                    placeholder="Nº Telefone Escritório"
                />
            </View>
            <View style={styles.inputTipo}>
                <Text>Tipo:</Text>
                <Picker
                    selectedValue={tipo}
                    style={{ height: 40, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}>
                    <Picker.Item label="Nenhum" value="nenhum" />
                    <Picker.Item label="VIP" value="vip" />
                    <Picker.Item label="Lista Negra" value="lista_negra" />
                </Picker>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNotas}
                value={notas}
                multiline
                numberOfLines={4}
                placeholder="Notas"
            />
            <Button title="Adicionar Contacto" onPress={() => postContacto()} />
            <Link to={{ screen: 'Scanner' }}>
                <Image style={styles.imgQrCode}
                    source={require('../../src/imgs/qr-scan-regular-24.png')} />
            </Link>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '100%',
    },
    input2: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        flex: 1,
        width: 50,
    },
    input3: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        flex: 1,
        width: 50,
    },
    obrigatorio: {
        marginLeft: 14,
        marginTop: -12,
        fontSize: 9,
        color: 'red',
    },
    inputTipo: {
        margin: 12,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
});

export default CreateMecard;