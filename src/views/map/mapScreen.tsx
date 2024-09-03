import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, Platform, PermissionsAndroid, Alert, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../types';

// MAP
import MapView, { Marker } from 'react-native-maps';
/* import Geolocation from '@react-native-community/geolocation'; */
import * as Location from 'expo-location';
import Loader from '../../components/Loader';


type MapScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Map'>;

interface Props {
  navigation: MapScreenNavigationProp;
}

interface Location {
  latitude: number;
  longitude: number;
}

const MapScreen = ({ navigation }: Props) => {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission denied', 'Location permission is required to use this feature.');
            return;
          }
        }
        // Get and set geolocation
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (err) {
        console.error(err);
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={location.coords} title="Ubicación Actual" />
          </MapView>
        ) : (<Loader />)

        }

      </View>
      <Button
        title="Go back Home"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  mapContainer: {
    width: width * 0.8,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,

  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default MapScreen;