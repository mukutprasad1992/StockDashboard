import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../components/BackButton1';
import { SafeAreaView } from 'react-navigation';

const Analytic = ({ route, navigation }: any) => {
  const stockData = route.params.stockData;

  const bullProbability = (price: any): number => {
    return price.lastPrice >= 1000 ? 100 : 0;
  };

  const percentageBullish = bullProbability(stockData);

  const getBullMessage = (percentage: number) => {
    if (percentage >= 75) {
      return "Strong Bullish Trend! The stock is showing significant positive momentum, likely due to positive market sentiment and strong fundamentals.";
    } else if (percentage >= 50) {
      return "Moderate Bullish Trend. The stock is exhibiting positive momentum, indicating a favorable market outlook.";
    } else {
      return "Weak Bullish Trend. There is a slight positive bias in the stock's movement, but caution is advised.";
    }
  };

  const getBearMessage = (percentage: number) => {
    if (percentage <= -10) {
      return "Strong Bearish Trend! The stock is experiencing a significant downturn, possibly due to negative news or poor financial performance.";
    } else if (percentage <= -5) {
      return "Moderate Bearish Trend. The stock is showing a negative bias, suggesting caution in the current market conditions.";
    } else {
      return "Weak Bearish Trend. There is a slight negative bias in the stock's movement, but it may be influenced by short-term factors.";
    }
  };

  const bullColor = percentageBullish >= 50 ? 'green' : 'black';
  const bearColor = percentageBullish <= -5 ? 'red' : 'black';

  console.log("Stock Data in Analytic:", stockData);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text1}>Analytics</Text>
      <View style={styles.line} />
      <View>
        <Text style={styles.stockName}>{`${stockData.identifier}`}</Text>
        <Text style={styles.lastPrice}>{`${stockData.lastPrice}`}</Text>
      </View>
      <Text style={[styles.bull, { color: bullColor }]}>
        📈 Bull Probability: {percentageBullish}% - {getBullMessage(percentageBullish)}
      </Text>
      <View style={styles.gap} />
      <Text style={[styles.bear, { color: bearColor }]}>
        📉  Bear Probability: {percentageBullish}% - {getBearMessage(percentageBullish)}
      </Text>
      <BackButton goBack={navigation.goBack} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  text1: {
    fontWeight: "bold",
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
  stockName: {
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 19,
    textAlign: "center",
  },
  lastPrice: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  bull: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 20,
    width: "100%",
  },
  bear: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 20,
    width: "100%",
  },
  gap: {
    height: 20,
  },
});

export default Analytic;
