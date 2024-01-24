import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { WebView } from 'react-native-webview';
import Script from './helper.js';

const JobFinder = () => {
  const webViewRef = useRef(null);
  const [jobFound, setJobFound] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Initial background color
  const webViewScript = Script.getWebViewScript();

  useEffect(() => {
    let intervalId;

    const startColorChanging = () => {
      intervalId = setInterval(() => {
        setBackgroundColor(getRandomColor());
      }, 1000); // Change color every second
    };

    const stopColorChanging = () => {
      clearInterval(intervalId);
    };

    if (jobFound) {
      // Start changing background color when job is found
      startColorChanging();

      // Simulating a job search duration (e.g., 10 seconds)
      setTimeout(() => {
        // Stop changing background color after a certain duration (e.g., 10 seconds)
        stopColorChanging();
        setJobFound(false);
      }, 10000); // Stop changing color after 10 seconds (adjust as needed)
    }

    // Cleanup function to stop the interval when the component unmounts or job is found
    return () => {
      stopColorChanging();
    };
  }, [jobFound]);

  const getRandomColor = () => {
    // Generate a random hex color code
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

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
    <View style={[styles.container, { backgroundColor }]}>
      {jobFound ? (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Job Found in the St Thomas!</Text>
        </View>
      ) : (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>No job found in St. Thomas</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default JobFinder;
