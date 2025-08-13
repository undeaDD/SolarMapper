// /app/sidebar/index.tsx
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Sidebar() {
  return (
    <SafeAreaView 
        style={{ flex: 1 }}
    >
        <ScrollView 
            contentContainerStyle={{ padding: 16 }}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
        >
            <View style={{backgroundColor: '#151515'}}>
                <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 16, color: "white" }}>Select Document:</Text>
            </View>

            <TouchableOpacity onPress={() => {}}>
                <Text style={{ fontSize: 20, color: 'orange', marginBottom: 8 }}>- Document 1</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
                <Text style={{ fontSize: 20, color: 'orange', marginBottom: 8 }}>- Document 2</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
                <Text style={{ fontSize: 20, color: 'orange', marginBottom: 8 }}>- Document 3</Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
}