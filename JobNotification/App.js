import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { WebView } from 'react-native-webview';
import Script from './helper.js';

const JobFinder = () => {
  const webViewRef = useRef(null);
  const [jobFound, setJobFound] = useState(false);
  const webViewScript = Script.getWebViewScript();


 

  const onLoadEnd = () => {
    const searchText = 'St. Thomas, ON Canada';
    const searchScript = Script.getSearchScript(searchText);

    // Execute the searchScript in the WebView
    webViewRef.current.injectJavaScript(searchScript);
  };

  const onMessage = (event) => {
    // Handle the message received from WebView
    const message = event.nativeEvent.data;
    if (message === 'Job Found') {
      setJobFound(true);
      // Vibrate the phone when job is found
      Vibration.vibrate();
    } else if (message === 'No Job Found') {
      setJobFound(false);
    }
  };

  return (
    <View style={styles.container}>
      {jobFound ? (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Job Found in the app!</Text>
        </View>
      ) : (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>No job found.</Text>
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://hvr-amazon.my.site.com/BBIndex?refURL=https%3A%2F%2Fhvr-amazon.my.site.com%2FIndex' }}
        injectedJavaScript={webViewScript}
        onLoadEnd={onLoadEnd}
        onMessage={onMessage}
        style={{ display: 'none' }} // Hide the WebView initially
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  overlayText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default JobFinder;
