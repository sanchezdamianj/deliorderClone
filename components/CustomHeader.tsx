import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';
import React, { useRef } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomSheet from './BottomSheet';

const SearchBar = () =>  (
    <View style={styles.searchContainer}>
      <View style={styles.searchSection}>
        <View style={styles.searchField}>
          <Ionicons name='search' size={20} style={styles.searchIcon} color={Colors.medium} />
          <TextInput 
            style={styles.input} 
            placeholder='Restaurants, groceries, dishes'
            placeholderTextColor={Colors.medium}
          />
        </View>
        <Link href={'/(modal)/filter'} asChild>
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name='options-outline' size={20} color={Colors.primary} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
);



const CustomHeader = () => {

  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const openModal = () => {
    bottomSheetRef.current?.present()
    
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomSheet ref={bottomSheetRef}  />
      <View style={styles.container}>
        <TouchableOpacity onPress={openModal}>
          <Image style={styles.bike} source={require('@/assets/images/bike.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleContainer} onPress={openModal}> 
          <Text style={styles.title}>
            Deliver - Nowsad
          </Text>
          <View style={styles.locationContainer}>
            <Text style={styles.subtitle}>Buenos Aires</Text>
            <Ionicons name='chevron-down' size={16} color={Colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name='person-outline' size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View> 
      <SearchBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  bike: {
    width: 30,
    height: 30
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.medium
  },
  subtitle: {
    fontSize: 18,
    color: 'bold'
  },
  profileButton: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 50
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    height: 60,
    backgroundColor: '#fff'
  },
  searchSection: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchField: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: Colors.grey,
    flexDirection: 'row',
    alignItems: 'center'

  },
  input: {
    padding: 10,
    flex: 1,
    color: Colors.mediumDark,
  },
  searchIcon: {
    paddingLeft: 4,
    color: Colors.medium
  },
  optionButton: {
    padding: 10,
    borderRadius: 50
  }
})

export default CustomHeader;
