import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

const statuses = [
  'Order Placed',
  'Preparing',
  'Picked by Delivery Partner',
  'On the Way',
  'Delivered',
];

const StatusScreen = () => {
  const route = useRoute();
  const { orderId } = route.params || {};
  const [status, setStatus] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const statusRef = useRef(status);

  const fetchStatus = async () => {
    try {
      const res = await fetch(`http://192.168.1.5:5000/order-status/${orderId}`);
      const data = await res.json();
      console.log('📦 Status fetched:', data.status);
      setStatus(data.status || 'Unknown');
      statusRef.current = data.status;
    } catch (err) {
      console.error('❌ Error fetching status:', err);
      setStatus('Error fetching status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!orderId) {
      setStatus('❌ No Order ID');
      return;
    }

    fetchStatus(); // initial fetch

    const interval = setInterval(() => {
      if (statusRef.current !== 'Delivered' && statusRef.current !== 'Error fetching status') {
        fetchStatus();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [orderId]);

  const currentIndex = statuses.indexOf(status);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🚚 Delivery Status</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        statuses.map((step, i) => (
          <Text
            key={i}
            style={{
              fontSize: 18,
              marginVertical: 5,
              color: i <= currentIndex ? 'green' : '#999',
              fontWeight: i === currentIndex ? 'bold' : 'normal',
            }}
          >
            {i < currentIndex ? '✅' : i === currentIndex ? '⏳' : '•'} {step}
          </Text>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});

export default StatusScreen;
