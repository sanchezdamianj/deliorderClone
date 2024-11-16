
import CustomHeader from '@/components/CustomHeader';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-get-random-values';



export const unstable_settings = {
  initialRouteName: 'index',
};


export default function RootLayoutNav() {
  const navigation = useNavigation();
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
        <Stack.Screen name="index" options={{
          header: () => <CustomHeader />
        }} />
        <Stack.Screen name='(modal)/filter'
          options={{
            presentation: 'modal',
            headerTitle: 'Filter',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#fff'
            },
            headerLeft: () => (
              <TouchableOpacity onPress={()=> {navigation.goBack()}}>
                <Ionicons name='close-outline' size={28} color={Colors.primary}/>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name='(modal)/location-search'
          options={{
            presentation: 'fullScreenModal',
            headerTitle: 'Select location',
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity onPress={()=> {navigation.goBack()}}>
                <Ionicons name='close-outline' size={28} color={Colors.primary}/>
              </TouchableOpacity>
            ),
          }}
        />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
