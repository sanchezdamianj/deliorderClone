import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export type Ref = BottomSheetModal;

const BottomSheet =forwardRef<Ref>((props, ref) => {

  const snapPoints = useMemo(() => ['60%'], [])
  
  const renderBackdrop = useCallback((props:any)=> <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])

  const { dismiss} = useBottomSheetModal()

  return (
    <BottomSheetModal 
      ref={ref} 
      snapPoints={snapPoints} 
      handleIndicatorStyle={ { display: 'none'}}
      backgroundStyle={{ borderRadius: 0, backgroundColor: '#fff'}}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
          <View style={styles.toggle}>
            <TouchableOpacity style={styles.toggleActive}>
              <Text style={styles.activeText}>Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleInActive}>
              <Text style={styles.inActiveText}>Pickup</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subHeader}>Your Location</Text>
          <Link href={'/(modal)/location-search'} asChild>
            <TouchableOpacity>
              <View style={styles.item}>
                <Ionicons name='location-outline' size={20} color={Colors.medium} />
                <Text style={{flex: 1}} >Current location</Text>
                <Ionicons name='chevron-forward'  size={20} color={Colors.primary}/>
              </View>
            </TouchableOpacity>
          </Link>
          <Text style={styles.subHeader}>Arrival time</Text>
          <TouchableOpacity>
              <View style={styles.item}>
                <Ionicons name='stopwatch-outline' size={20} color={Colors.medium} />
                <Text style={{flex: 1}} >Now</Text>
                <Ionicons name='chevron-forward'  size={20} color={Colors.primary}/>
              </View>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=> dismiss()} >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
    </BottomSheetModal>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    flex:1
  },
  toggle:{
    flexDirection: 'row',
    justifyContent: 'center',
    gap:10,
    marginBottom: 32
  },
  toggleActive:{
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30
  },
  activeText:{
    color: '#fff',
    fontWeight: '700'
  },
  toggleInActive: {
    
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30

  }, 
  inActiveText: {
    color: Colors.primary,

  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin:16,
    borderRadius: 4,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    margin: 16
  },
  item: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderColor: Colors.grey,
    borderWidth: 1
  }
})

export default BottomSheet;