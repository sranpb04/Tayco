// screens/BarcodeScannerScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Camera } from 'expo-camera';

const BarcodeScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={{ flex: 0.1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Flip" onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)} />
        </View>
      </Camera>
    </View>
  );
};

export default BarcodeScannerScreen; // Make sure this is the default export
