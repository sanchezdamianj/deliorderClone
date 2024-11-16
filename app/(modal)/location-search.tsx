import Colors from '@/constants/Colors'
import { useNavigation } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView from 'react-native-maps'
const LocationSearch = () => {

  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: -34.6345,
    longitude: -58.4872,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  return (
    <View style={{ flex: 1 }}> 
      <GooglePlacesAutocomplete
        placeholder='Search'
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: 'en',
        }}
      />
      <MapView showsUserLocation={true} style={styles.map} region={location} />

      <View style={styles.absoluteBox}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  absoluteBox: {
    position: 'absolute',
    bottom: 20,
    width: '100%'

  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    borderRadius: 8
  },
  buttonText: {

  }
})

export default LocationSearch