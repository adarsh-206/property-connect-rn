import React from 'react';
import {SafeAreaView, StatusBar, Text, View, StyleSheet} from 'react-native';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.brand}>Property Connect</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#202D67',
  },
  brand: {
    fontSize: 36,
    fontWeight: '900',
    color: '#202D67',
    marginTop: 5,
  },
});

export default App;
