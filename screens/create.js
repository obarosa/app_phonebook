import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import api from '../services/fetchcontacts';

const Create = () => {

    const [username, onChangeUsername] = useState('');
    const [nome, onChangeNome] = useState('');
    const [apelido, onChangeApelido] = useState('');
    const [email, onChangeEmail] = useState('');
    const [telemovel, onChangeTelemovel] = useState('');
    const [tipo, setTipo] = useState("Nenhum");
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
            tipo,
            usaNmrTelemovel: usarNmrTelemovel,
            usaNmrTlfEscrt: usarNmrEscritorio,
            notas,
        }).then(function (response) {
            console.log('DADOS ENVIADOS', response);
        }).catch(function (error) {
            console.log('DEU ASNEIRA', error);
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
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TextInput
                    style={styles.input2}
                    onChangeText={onChangeNome}
                    value={nome}
                    placeholder="Primeiro Nome"
                />
                <TextInput
                    style={styles.input2}
                    onChangeText={onChangeApelido}
                    value={apelido}
                    placeholder="Apelido"
                />
            </View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                keyboardType='email-address'
                placeholder="E-mail"
            />
            <Text style={styles.obrigatorio}>Obrigatório</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTelemovel}
                value={telemovel}
                keyboardType='number-pad'
                placeholder="Número Telemóvel"
            />
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
    },
    obrigatorio:{
        marginLeft:14,
        marginTop:-12,
        fontSize:9,
        color:'red',
    },  
    inputTipo: {
        margin: 12,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    yau:{
        display:'none',
    }
});
export default Create;