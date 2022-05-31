import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, View, Text, Alert } from 'react-native';
import { Link } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons/faQrcode'

const radioButtonsData = [{
    id: '1',
    label: "Nenhum",
    value: "nenhum",
    selected: true
}, {
    id: '2',
    label: "VIP",
    value: "vip",
    selected: false
}, {
    id: '3',
    label: "Lista Negra",
    value: "lista_negra",
    selected: false
}]

const Create = ({ navigation }) => {

    const [username, onChangeUsername] = useState('');
    const [nome, onChangeNome] = useState('');
    const [apelido, onChangeApelido] = useState('');
    const [email, onChangeEmail] = useState('');
    const [empresa, onChangeEmpresa] = useState('');
    const [telemovel, onChangeTelemovel] = useState('');
    const [escritorio, onChangeEscritorio] = useState('');
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)
    const [grupo] = useState("Nenhum");
    const [notas, onChangeNotas] = useState('');

    const [usarNmrTelemovel] = useState(0);
    const [usarNmrEscritorio] = useState(0);

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

    const postContacto = () => {
        var valorSelect
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].selected == true) {
                valorSelect = radioButtons[i].value;
            }
        }
        axios.post("/api/dashboard/admin/save", {
            username,
            firstName: nome,
            lastName: apelido,
            email,
            empresa,
            nmrTelemovel: telemovel,
            nmrEscritorio: escritorio,
            tipo: valorSelect,
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
        }).catch(function (error) {
            Alert.alert(
                "Contacto NÃO adicionado",
                "Preencha os dados corretamente!",
                [
                    {
                        text: "Voltar",
                        style: "cancel"
                    }
                ]
            );
            console.log(error)
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, maxWidth: '95%' }}>
            <Text style={styles.inputHeader}>Username:</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Username"
            />
            <Text style={styles.obrigatorio}>Obrigatório</Text>
            <Text style={styles.inputHeader}>E-mail:</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                keyboardType='email-address'
                placeholder="E-mail"
            />
            <Text style={styles.obrigatorio}>Obrigatório</Text>
            <Text style={styles.inputHeader}>Empresa:</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmpresa}
                value={empresa}
                placeholder="Empresa"
            />
            <Text style={styles.inputHeader2}>Nome:</Text>
            <View style={{ display: 'flex', flexDirection: 'row', width: '102%', marginTop: -11 }}>
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
            <Text style={styles.inputHeader2}>Contactos:</Text>
            <View style={{ display: 'flex', flexDirection: 'row', width: '102%', marginTop: -11 }}>
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
                <Text style={{ fontWeight: 'bold' }}>Tipo:</Text>
                <RadioGroup
                    layout="row"
                    radioButtons={radioButtons}
                    onPress={onPressRadioButton}
                />
            </View>
            <Text style={styles.inputHeader}>Notas:</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNotas}
                value={notas}
                multiline
                numberOfLines={4}
                placeholder="Notas"
            />
            <Button title="Adicionar Contacto" onPress={() => postContacto()} />
            <View style={styles.divQrcode}>
                <Link to={{ screen: 'Scanner' }}>
                    <FontAwesomeIcon icon={faQrcode} size={26} />
                </Link>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputHeader: {
        paddingTop: 7,
        marginLeft: 14,
        marginBottom: 3,
        fontWeight: 'bold',
    },
    inputHeader2: {
        marginLeft: 14,
        marginBottom: 3,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        marginRight: 12,
        marginBottom: 12,
        marginLeft: 12,
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
        marginRight: 14,
        marginLeft: 14,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    divQrcode: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 15,
    },
});

export default Create;