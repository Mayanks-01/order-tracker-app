import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // ✅ Correct Picker

export default function AdminDashboardScreen({ route }) {
  const { token } = route.params;
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch('http://192.168.1.5:5000/admin/orders', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data);
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://192.168.1.5:5000/admin/order/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    fetchOrders(); // refresh
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statuses = [
    'Order Placed',
    'Preparing',
    'Picked by Delivery Partner',
    'On the Way',
    'Delivered',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.id}>#{item._id.slice(-5)}</Text>
            <Text>{item.address}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            <Picker
              selectedValue={item.status}
              onValueChange={(value) => updateStatus(item._id, value)}
              style={styles.picker}
            >
              {statuses.map((s) => (
                <Picker.Item key={s} label={s} value={s} />
              ))}
            </Picker>
          </View>
        )}
      />
      <Button title="Refresh" onPress={fetchOrders} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 6,
  },
  id: { fontWeight: 'bold', fontSize: 16 },
  status: { marginTop: 4 },
  picker: { marginTop: 6, backgroundColor: '#eee' },
});
