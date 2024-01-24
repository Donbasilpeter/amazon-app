import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import refreshBrowser from './helper.js'; // Update the path accordingly

const JobFinderApp = () => {
  useEffect(() => {
    const userDataDir = process.env.USER_DATA_DIR; // You may need to adjust how you get these values in the React Native environment
    const targetUrl = process.env.TARGET_URL;
    const searchText = process.env.SEARCH_TEXT;

    // Run the function when the component mounts
    refreshBrowser(userDataDir, targetUrl, searchText);
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  return (
    <View style={styles.container}>
      <Text>Job Finder App</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default JobFinderApp;
