import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,Keyboard  } from 'react-native';
import BackButton from '../components/BackButton1';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';

const Funds = ({ navigation }: any) => {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);

  const handleAddFunds = () => {
    const addedAmount = parseFloat(amount);
    if (!isNaN(addedAmount)) {
      setBalance(balance + addedAmount);
      setAmount('');
      Keyboard.dismiss();

    }
  };

  const handleWithdrawFunds = () => {
    const withdrawnAmount = parseFloat(amount);
    if (!isNaN(withdrawnAmount) && balance >= withdrawnAmount) {
      setBalance(balance - withdrawnAmount);
      setAmount('');
      Keyboard.dismiss(); 

    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.funds}>Wallet</Text>
      <View style={styles.line}/>
      <Text style={styles.balanceAmount}>Available Balance</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceValue}>Rs. {balance}</Text>
      </View>
      <TextInput 
  style={styles.input}
  placeholder="Enter amount"
  value={amount}
  onChangeText={(text) => setAmount(text)}
  keyboardType="numeric"
  caretHidden={false} 
/>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleAddFunds}
          style={styles.addFunds}
        >
          Add
        </Button>
        <Button
          mode="contained"
          onPress={handleWithdrawFunds}
          style={styles.withdrawFunds}
        >
          Withdraw
        </Button>
      </View>
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
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 23,
    color:'black',
    marginTop: 50,


  },
  balanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    textAlign: 'center', 
    width: '70%',
    height: 60,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    fontSize: 21,
    alignContent: "center",
    padding: 0,
    paddingHorizontal: 10,
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
    marginTop:30
  },
  addFunds: {
    backgroundColor: '#10610c',
    flex: 1,
    marginHorizontal: 10,

  },
  withdrawFunds: {
    backgroundColor: '#ab1313',
    flex: 1,
    marginHorizontal: 10,

  },
  line: {
    height: 1,
    backgroundColor: 'black',
    width: '150%',
    justifyContent: 'flex-start',
    marginTop:1
  },
  funds: {
    fontWeight: "bold",
    width: 100,
    marginTop: 30,
    fontSize: 24,
    marginLeft:35
  },
  back:{
    marginTop:10
  }
});   
export default Funds;
