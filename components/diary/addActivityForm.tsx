import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface FormProps {
  onSubmit: (values: { type: string, duration: number, distance: number | undefined, petName: string }) => void;
  onClose: () => void;
}

const AddActivityForm = ({ onSubmit, onClose }: FormProps) => {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [petName, setPetName] = useState('');

  const handleSubmit = () => {
    onSubmit({
      type,
      duration: Number(duration),
      distance: distance ? Number(distance) : undefined,
      petName,
    });
    onClose();
    // Reset form
    setType('');
    setDuration('');
    setDistance('');
    setPetName('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration"
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput
        style={styles.input}
        placeholder="Distance"
        value={distance}
        onChangeText={setDistance}
      />
      <TextInput
        style={styles.input}
        placeholder="Pet Name"
        value={petName}
        onChangeText={setPetName}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddActivityForm;