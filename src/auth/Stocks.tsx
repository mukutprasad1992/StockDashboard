import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';

const Stocks = ({ navigation }: any) => {
  const [stockData, setStockData] = useState<any | null>(null);
  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = () => {
    setStockData([]);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://latest-stock-price.p.rapidapi.com/price',
        params: {
          Indices: 'NIFTY 50',
        },
        headers: {
          'X-RapidAPI-Key': '6ccd68c026mshf70a27591fac842p1cca2bjsn334f1d419d8f',
          'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com',
        },
      };
      const response = await axios.request(options);

      console.log("Response", response.data);
      if (response.data && response.data.length) {
        setRefreshing(false);
        setStockData(response.data);
      }
    } catch (error) {
      console.error("Error While Fetch Stocks", error);
    }
  };

  const Analytic = () => {
    navigation.navigate('Analytic');
  };

  const getPriceColor = (price: any) => {
    return price.lastPrice >= 1000 ? 'green' : 'red';
  };
  
  const getTrend = (price: any) => {
    return price.lastPrice >= 1000 ? '↑' : '↓';
  };
  

  return (
    <View style={styles.container}>
      {stockData ? (
        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {stockData.map((data: any, index: any) => (
            <View key={index} style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.name}>{data.identifier}</Text>
              </View>
              <View style={styles.column}>
                <Text style={[styles.price, { color: getPriceColor(data) }]}>
                  {data.lastPrice} ({getTrend(data)})
                </Text>
              </View>
              <View style={styles.column}>
                <Button mode="contained" onPress={Analytic} style={styles.button}>
                  Analytics
                </Button>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  column: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 10,
  },
  name: {
    marginTop: 20,
    fontSize: 15,
    textAlign: 'left',
  },
  price: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 10,
    marginRight: 5,
  },
});

export default Stocks;
