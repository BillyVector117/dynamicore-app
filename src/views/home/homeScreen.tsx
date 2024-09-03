import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({ navigation }: Props) => {
    const [item, setItem] = useState<string>('');
    const [items, setItems] = useState<string[]>([]);
    const [numColumns, setNumColumns] = useState<number>(3);

    const addItem = (): void => {
        if (item.trim()) {
            setItems([...items, item]);
            setItem('');
        }
    };

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.listItem}>
            <Text style={styles.itemText}>{item}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <Button
                    title="Go to Map"
                    onPress={() => navigation.navigate('Map')}
                />
                <Text style={styles.headerText}>Add new element</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter something..."
                    value={item}
                    onChangeText={setItem}
                />
                <TouchableOpacity style={styles.button} onPress={addItem}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                numColumns={numColumns}
                columnWrapperStyle={styles.row}
                key={`grid-${numColumns}`}
            />
        </SafeAreaView>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1E1E1E',
    },
    formContainer: {
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 20,
        backgroundColor: '#2A2A2A',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#4B4B4B',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#333333',
        color: '#fff',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listItem: {
        flex: 1,
        margin: 5,
        backgroundColor: '#2A2A2A',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    itemText: {
        fontSize: 18,
        color: '#fff',
    },
    row: {
        justifyContent: 'space-between',
    },
});