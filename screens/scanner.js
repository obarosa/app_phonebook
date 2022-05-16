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
        // alert(`${data} AND ${type}`);
        var res = data.split(";");
        var yau = [];
        for (let i = 0; i < res.length; i++) {
            var pontos = res[i].split('N:');
            yau.push([pontos[i]]+pontos[i+1]);
        }
        console.log(yau);
        console.log(typeof yau);
        Alert.alert(
            "Contacto Detectado!",
            `${[res]}`,
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