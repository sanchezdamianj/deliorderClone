import categories from '@/assets/data/filter.json'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface Category {
    name: string;
    count: number;
    checked?: boolean;
}

const ItemBox = () => (
    <>
    <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item} >
            <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
            <Text style={{flex: 1}}>Sort</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} >
            <Ionicons name="fast-food-outline" size={20} color={Colors.medium}/>
            <Text style={{flex: 1}}>Hygiene rating</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} >
            <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
            <Text style={{flex: 1}}>Offers</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} >
            <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
            <Text style={{flex: 1}}>Dietary</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
    </View>
    <Text style={styles.header}>Categories</Text>
    </>
)

const Filter = () => {

  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(categories)
  const [selected, setSelected] = useState<Category[]>([]);
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

    useEffect(() => {
        const hasSelected = selected.length > 0;
        const selectedItems = items.filter((item) => item.checked);
        const newSelected = selectedItems.length > 0;

        if(hasSelected !== newSelected){
            flexWidth.value = withTiming(newSelected ? 150: 0)
            scale.value = withTiming(newSelected ? 1: 0)
        }

        setSelected(selectedItems);
    },[items])

  const handleClearAll = () => {
    const updatedItems = items.map((item) =>{
        item.checked = false;
        return item;
    })
    setItems(updatedItems);
  }

  const animatedStyles = useAnimatedStyle(()=> {
    return {
        width: flexWidth.value,
        opacity: flexWidth.value > 0 ? 1 : 0
    }
  })
  const animatedText = useAnimatedStyle(()=> {
    return {
        transform: [{scale: scale.value}]
    }
  })

  const renderItem: ListRenderItem<Category> = ({item, index}) => (
    <View style={styles.row}>
        <Text style={styles.itemText}>{item.name} ({item.count})</Text>
        
        <View style={styles.checkboxContainer}>
        <BouncyCheckbox 
            isChecked={items[index].checked}
            fillColor={Colors.primary} 
            useBuiltInState={true}
            unFillColor="#fff"
            iconStyle={{borderColor: Colors.primary, borderRadius: 4}} 
            onPress={()=>{
                const isChecked = items[index].checked;

                const updatedItems = items.map((currentItem) => {
                    if (currentItem.name === item.name) {
                        return { ...currentItem, checked: !isChecked}; 
                    }
                    return currentItem;
                })
                setItems(updatedItems)
            }} 
        />
        </View>
    </View>
  )

  return (
    <View style={styles.container}>
        <FlatList 
            data={items}
            renderItem={renderItem}
            ListHeaderComponent={<ItemBox />}
        />
        <View style={{height: 76}} />

        <View style={styles.footer}>
            <View style={styles.btnContainer}>
              <Animated.View  style={[animatedStyles, styles.outlineButton]}>
                <TouchableOpacity onPress={handleClearAll}>
                    <Animated.Text style={[animatedText, styles.outlinButtonText]}>Clear all</Animated.Text>
                </TouchableOpacity>
              </Animated.View>

            <TouchableOpacity style={styles.fullButton} onPress={() => {navigation.goBack()}}>
                <Text style={styles.footerText}>Done</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: '#fff',
        padding:10,
        elevation: 10,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: -10
        }
      
    },
    fullButton: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        flex: 1,
        height: 56
    },
    footerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
        marginBottom: 16
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16
    },
    item: {
        flexDirection: 'row',
        gap: 20,
        alignItems:"center",
        backgroundColor:'#fff',
        paddingVertical: 10,
        borderColor: Colors.grey,
        borderBottomWidth: 1
    },
    itemText:{
        color: Colors.mediumDark,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        padding:10,
        backgroundColor: '#fff',
    },
    btnContainer: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        width: '100%'
    },
    outlineButton: {
        borderColor: Colors.primary,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    outlinButtonText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 16
    },
    checkboxContainer: {
        alignItems: 'flex-end'
    }
})

export default Filter