import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { X } from 'lucide-react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    petName?: string;
    activityType?: string;
  }) => void;
}

export default function FilterModal({ visible, onClose, onApplyFilters }: FilterModalProps) {
  const [selectedPet, setSelectedPet] = useState<string | undefined>();
  const [selectedActivity, setSelectedActivity] = useState<string | undefined>();

  const activityTypes = ['Walk', 'Play', 'Feed', 'Training'];
  const pets = ['Max', 'Bella', 'Charlie'];

  const handleApply = () => {
    onApplyFilters({
      petName: selectedPet,
      activityType: selectedActivity,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedPet(undefined);
    setSelectedActivity(undefined);
    onApplyFilters({});
    onClose();
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
            <Text style={styles.modalTitle}>Filter Activities</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#6B7280" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Activity Type</Text>
            <View style={styles.filterOptions}>
              {activityTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterChip,
                    selectedActivity === type && styles.filterChipSelected,
                  ]}
                  onPress={() => setSelectedActivity(type)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedActivity === type && styles.filterChipTextSelected,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Pet</Text>
            <View style={styles.filterOptions}>
              {pets.map((pet) => (
                <TouchableOpacity
                  key={pet}
                  style={[
                    styles.filterChip,
                    selectedPet === pet && styles.filterChipSelected,
                  ]}
                  onPress={() => setSelectedPet(pet)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedPet === pet && styles.filterChipTextSelected,
                    ]}
                  >
                    {pet}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
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
  filterSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  filterChipSelected: {
    backgroundColor: '#8B5CF6',
  },
  filterChipText: {
    color: '#4B5563',
    fontSize: 14,
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  resetButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  resetButtonText: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  applyButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F59E0B',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

