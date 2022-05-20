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
            var empresa = null;
            if (arr.split('\n').find(d => d.includes('ORG'))) {
                empresa = arr.split('\n').find(d => d.includes('ORG')).split(':')[1]; // Empresa
            }


            var mobiles = []
            var arrayi = arr.split('\n')
            for (let g = 0; g < arrayi.length; g++) {
                if (arrayi[g].includes('TEL')) {
                    mobiles.push(arrayi[g].split(':')[1])
                }
            }
            var telemovel
            var escritorio
            for (let y = 0; y < mobiles.length; y++) {
                console.log(mobiles[y])
                if (mobiles[y].length === 13) {
                    mobiles[y] = mobiles[y].slice(4);
                }
                if (mobiles[y].charAt(0) === '9') {
                    telemovel = mobiles[y];
                } else if (mobiles[y].charAt(0) === '2') {
                    escritorio = mobiles[y];
                }
            }

            console.log(data);
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
                    teles.push(element);
                }
            }
            if (teles.length > 1) {
                if (teles[0].length === 13) {
                    teles[0] = teles[0].slice(4)
                }
                if (teles[1].length === 13) {
                    teles[1] = teles[1].slice(4)
                }
            } else {
                if (teles[0].length === 13) {
                    teles[0] = teles[0].slice(4)
                }
            }

            var mecard_telemovel
            var mecard_escritorio
            for (let j = 0; j < teles.length; j++) {
                if (teles[j].charAt(0) === '9') {
                    mecard_telemovel = teles[j];
                } else if (teles[j].charAt(0) === '2') {
                    mecard_escritorio = teles[j];
                }
            }
        }

        if (arr.includes('BEGIN:VCARD')) {
            console.log('ENTROU NO ALERTA - VCARD')
            Alert.alert(
                "Contacto Detectado!",
                "",
                // `${[data]}`,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Criar Contacto", onPress: () => navigation.navigate('Vcard', { username: `${[username]}`, priNome: `${[priNome]}`, apelido: `${[apelido]}`, email: `${[email]}`, empresa: `${[empresa]}`, telemovel: `${[telemovel]}`, escritorio: `${[escritorio]}` }) }
                ]
            );
        } else if (arr.includes('MECARD')) {
            console.log('ENTROU NO ALERTA - MECARD')
            Alert.alert(
                "Contacto Detectado!",
                "",
                // `${[data]}`,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Criar Contacto", onPress: () => navigation.navigate('Mecard', { username: `${[mecard_username]}`, priNome: `${[mecard_priNome]}`, apelido: `${[mecard_apelido]}`, email: `${[mecard_email]}`, telemovel: `${[mecard_telemovel]}`, escritorio: `${[mecard_escritorio]}` }) }
                ]
            );
        }
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