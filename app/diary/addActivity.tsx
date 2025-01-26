import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { supabase } from '@/data/supabaseClient'; // Import your Supabase client
import useUser from '@/hooks/useUser'; // Custom hook to get the Firebase user
import { useAddActivity } from '@/api/activities';
import { getUserdbFromFireBase } from '@/api/auth';

export default function AddActivityScreen() {
  const router = useRouter();
  const [userId, setUserId] = useState<number>(0);
  

  // Form state
  const [typeId, setTypeId] = useState('');
  const [petId, setPetId] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const user = useUser()  


  if (!user) {
     return <Redirect href="/" />;
   }
   
   const handleGetDbUser = async () => {
     try {
       const dbUser = await getUserdbFromFireBase(user?.email);
       setUserId(dbUser.id);
     } catch (error) {
       console.error(error);
     }
   };
   
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to add an activity.');
      return;
    }
  
    // Input validation
    if (!typeId || !petId || !date || !duration) {
      Alert.alert('Validation Error', 'Please fill out all required fields.');
      return;
    }
  
    // Create a new activity object
    const newActivity = {
      typeId: parseInt(typeId, 10),
      petId: parseInt(petId, 10),
      userId: userId,
      date: new Date(date).toISOString(),
      duration: parseInt(duration, 10),
      distance: distance ? parseFloat(distance) : null,
    };
  
    // Call the addActivity function from the useAddActivity hook
    const { addActivity } = useAddActivity();
    await addActivity(newActivity);
  
    // Redirect to the diary index page
    router.push('/diary');
  };

   useEffect(() => {
      handleGetDbUser();
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Activity</Text>
      <TextInput
        style={styles.input}
        placeholder="Activity Type ID"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={typeId}
        onChangeText={setTypeId}
      />
      <TextInput
        style={styles.input}
        placeholder="Pet ID"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={petId}
        onChangeText={setPetId}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        placeholderTextColor="#aaa"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput
        style={styles.input}
        placeholder="Distance (optional, km)"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Activity</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B46C1',
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#F6AD55',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
