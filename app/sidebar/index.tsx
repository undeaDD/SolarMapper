import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Document } from '../_layout';

export type SidebarProps = {
    selectedDocument: Document | null;
    setSelectedDocument: (doc: Document | null) => void;
}

export default function Sidebar(props: SidebarProps) {

    const documents = [
        {
            id: 1,
            title: "Document 1",
            url: "https://devsforge.de/temp/demo.jpeg"
        },
        {
            id: 2,
            title: "Document 2",
            url: "https://devsforge.de/temp/demo.jpeg"
        },
        {
            id: 3,
            title: "Document 3",
            url: "https://devsforge.de/temp/demo.jpeg"
        }
    ]

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

            {documents.map((doc, index) => (
                <TouchableOpacity key={index} onPress={() => {
                    props.setSelectedDocument(doc);
                }}>
                    <Text style={{ fontSize: 20, color: (props.selectedDocument?.id === doc.id) ? 'orange' : 'white', marginBottom: 8 }}>- {doc.title}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </SafeAreaView>
  );
}