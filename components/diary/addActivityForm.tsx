import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { X } from 'lucide-react-native';

interface AddActivityFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (activity: {
    type: string;
    duration: number;
    distance?: number;
    petName: string;
  }) => void;
}

export default function AddActivityForm({ visible, onClose, onSubmit }: AddActivityFormProps) {
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
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Activity</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#6B7280" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.formField}>
              <Text style={styles.label}>Activity Type</Text>
              <TextInput
                style={styles.input}
                value={type}
                onChangeText={setType}
                placeholder="e.g., Walk, Play, Feed"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
                placeholder="30"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Distance (km, optional)</Text>
              <TextInput
                style={styles.input}
                value={distance}
                onChangeText={setDistance}
                keyboardType="numeric"
                placeholder="2.5"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Pet Name</Text>
              <TextInput
                style={styles.input}
                value={petName}
                onChangeText={setPetName}
                placeholder="Enter pet name"
              />
            </View>

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Add Activity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  form: {
    gap: 16,
  },
  formField: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  submitButton: {
    backgroundColor: '#F59E0B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

