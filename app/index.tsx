import Categories from '@/components/Categories';
import Colors from '@/constants/Colors';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Categories />
        <Text style={styles.header}>
          Top picks in your neighbourhood
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    top: 70,
    backgroundColor: Colors.lightGrey
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
    color: Colors.medium
  }
})

export default Page
