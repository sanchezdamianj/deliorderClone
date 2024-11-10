
import CustomHeader from '@/components/CustomHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export const unstable_settings = {
  initialRouteName: 'index',
};


export default function RootLayoutNav() {
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
        <Stack.Screen name="index" options={{
          header: () => <CustomHeader />
        }} />
        
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
