import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function CheckoutScreen({ navigation }) {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const placeOrder = async () => {
    if (!address || !paymentMethod) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.5:5000/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: [
            { item: 'Pizza', qty: 1 },
            { item: 'Burger', qty: 2 },
          ],
          address,
          paymentMethod,
        }),
      });

      const data = await response.json();
      if (data.orderId) {
        navigation.navigate('Status', { orderId: data.orderId });
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('Something went wrong while placing your order.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🛒 Cart Summary</Text>
      <Text>Pizza x1 - ₹299</Text>
      <Text>Burger x2 - ₹198</Text>

      <Text style={styles.heading}>📍 Delivery Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.heading}>💳 Payment Method</Text>
      {['Google Pay', 'PhonePe', 'UPI', 'COD'].map((method) => (
        <TouchableOpacity
          key={method}
          style={[
            styles.paymentOption,
            paymentMethod === method && styles.selected,
          ]}
          onPress={() => setPaymentMethod(method)}
        >
          <Text>{method}</Text>
        </TouchableOpacity>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="Place Order" onPress={placeOrder} />
        <View style={{ height: 12 }} />
        <Button
          title="Admin Login"
          color="#555"
          onPress={() => navigation.navigate('AdminLogin')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
  },
  paymentOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 5,
  },
  selected: {
    backgroundColor: '#ccf',
    borderColor: '#00f',
  },
});
