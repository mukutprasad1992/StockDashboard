import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../components/BackButton1';
import { SafeAreaView } from 'react-navigation';

const Analytic = ({ route, navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>Analytics</Text>
      <View style={styles.line} />
      {/* Bull Analysis Section */}
      <View style={[styles.analysisContainer, styles.analysisBox]}>
        <Text style={styles.bullTitle}>Bullish Analysis</Text>
        <Text style={styles.analysisContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac velit sit amet arcu condimentum bibendum.
          Proin vitae augue nec urna consequat ultricies. Nulla facilisi. Suspendisse potenti.
        </Text>
        <Text style={styles.analysisProbabilityBullish}>
          Probabilty: 70%
        </Text>
      </View>

      {/* Bear Analysis Section */}
      <View style={[styles.analysisContainer, styles.analysisBox]}>
        <Text style={styles.bearTitle}>Bearish Analysis</Text>
        <Text style={styles.analysisContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac velit sit amet arcu condimentum bibendum.
          Proin vitae augue nec urna consequat ultricies. Nulla facilisi. Suspendisse potenti.
        </Text>
        <Text style={styles.analysisProbabilityBearish}>
          Probabilty: 30%
        </Text>
      </View>

      <BackButton goBack={navigation.goBack} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    fontWeight: 'bold',
    width: 120,
    marginTop: 25,
    fontSize: 24,
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    width: '150%',
    justifyContent: 'flex-start',
    marginTop: 3,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  analysisContainer: {
    marginTop: '25%',
    width: '100%',
    alignItems: 'center',
  },
  analysisBox: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  bullTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: 'green',
  },
  bearTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: 'red',
  },
  analysisContent: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    color: 'black',
  },
  analysisProbabilityBearish: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
    color: 'red',
  },
  analysisProbabilityBullish: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
    color: 'green',
  }
});

export default Analytic;
