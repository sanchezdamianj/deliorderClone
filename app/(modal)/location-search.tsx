import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
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
        placeholder='Search or move the map'
        textInputProps={{
          placeholderTextColor: Colors.medium,
          returnKeyType: "search"
        }}
        fetchDetails={true}
        onPress={(data, details) => {
          const point = details?.geometry?.location;
          if(!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng
          });
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: 'en',
        }}
        renderLeftButton={
          () => (
           <View style={styles.boxIcon}>
             <Ionicons size={24 } name='search-outline' color={Colors.medium}/>
           </View>
          )
        }
        styles={{
          container: {
            flex: 0
          },
          textInput: {
            backgroundColor: Colors.grey,
            paddingLeft: 36,
            borderRadius: 10
          },
          textInputContainer: {
            padding: 8,
            backgroundColor: '#fff'
          }
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  boxIcon: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 1
  }
})

export default LocationSearch