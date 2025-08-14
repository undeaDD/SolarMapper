import { useDocuments } from '@/provider/DocumentProvider';
import { useGlobal } from '@/provider/GlobalStateProvider';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Sidebar() {
  const { documents, selectedDocument, setSelectedDocument } = useDocuments();
  const { setSidebarOpen } = useGlobal();

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView 
            contentContainerStyle={styles.scrollContent}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <Text style={styles.headerText}>Select Document:</Text>
            </View>

            {documents.map((doc, index) => (
                <TouchableOpacity key={index} onPress={() => {
                    setSelectedDocument(doc);
                    setSidebarOpen(false);
                }}>
                    <Text style={[
                        styles.documentText,
                        selectedDocument?.id === doc.id && styles.selectedDocumentText
                    ]}>
                        - {doc.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    backgroundColor: '#151515',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  documentText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 8,
  },
  selectedDocumentText: {
    color: 'orange',
  },
});