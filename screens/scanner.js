import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Button, Text, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Scanner = ({ navigation }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);

        // V - CARD (Versão 3.0)
        var arr = data;
        if (arr.includes('BEGIN:VCARD')) {
            var username = arr.split('\n').slice(2, -1).find(d => d.includes('FN')).split(':')[1]; // Username
            var priNome = username.split(' ')[0]; // First Name
            var apelido = username.split(' ')[1]; // Last Name
            var email = arr.split('\n').find(d => d.includes('EMAIL')).split(':')[1]; // Email

            if (arr.split('\n').map(e => e.toLowerCase()).slice(2, -1).find(d => d.includes('tel'))) {
                if (arr.split('\n').map(e => e.toLowerCase()).slice(2, -1).find(d => d.includes('cell'))) {
                    var telemovel = arr.split('\n').map(e => e.toLowerCase()).slice(2, -1).find(d => d.includes('cell')).split(':')[1]
                }
                if (arr.split('\n').map(e => e.toLowerCase()).slice(2, -1).find(d => d.includes('home'))) {
                    var telemovel = arr.split('\n').map(e => e.toLowerCase()).slice(2, -1).find(d => d.includes('home')).split(':')[1]
                }
                if (arr.split('\n').map(e => e.toLowerCase()).slice(2, -1).find(d => d.includes('work'))) {
                    var escritorio = arr.split('\n').map(e => e.toLowerCase()).slice(2, -1).find(d => d.includes('work')).split(':')[1]
                }
            }

            console.log(priNome);
            console.log(apelido);
            console.log(username);
            console.log(email);
            console.log(telemovel);
            console.log(escritorio);
        }

        // MECARD
        if (arr.includes('MECARD')) {
            var mecard_username = arr.split(';').slice(0, -1).find(e => e.includes('N')).slice(7).split(':')[1]
            var mecard_priNome = mecard_username.split(' ')[0]
            var mecard_apelido = mecard_username.split(' ')[1]
            var mecard_email = arr.split(';').map(d => d.toLowerCase()).slice(0, -1).find(e => e.includes('email')).split(':')[1]

            let yau = arr.split(';')

            let teles = [];
            for (let i = 0; i < yau.length; i++) {
                let element = yau[i].slice(4);
                if (yau[i].includes('TEL')) {
                    if (teles.length === 13) {
                        teles.push(element.slice(4));
                    } else {
                        teles.push(element);
                    }
                }
            }
            console.log(teles);

            var mecard_telemovel
            var mecar_escritorio
            for (let j = 0; j < teles.length; j++) {
                if (teles[j].charAt(0) === '9') {
                    mecard_telemovel = teles[j];
                } else if (teles[j].charAt(0) === '2') {
                    mecar_escritorio = teles[j];
                }
            }

            console.log(mecar_escritorio);
            console.log(mecard_email);
        }

        Alert.alert(
            "Contacto Detectado!",
            `${[data]}`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Criar Contacto", onPress: () => navigation.navigate('Create', { name: 'Jane' }) }
            ]
        );
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Clica para Scanear de novo'} onPress={() => setScanned(false)} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

export default Scanner;