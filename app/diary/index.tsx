import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Filter, Trash2 } from 'lucide-react-native';
import { format } from 'date-fns';

interface Activity {
  id: string;
  type: string;
  duration: number;
  distance?: number;
  petName: string;
  date: Date;
}

export default function DiaryScreen() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const groupedActivities = activities.reduce((groups, activity) => {
    const date = format(activity.date, 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Activity Diary</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setShowFilters(true)}
          >
            <Filter color="#8B5CF6" size={24} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setShowAddForm(true)}
          >
            <Plus color="#8B5CF6" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {activities.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No Activities Logged Yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Tap the + button to log your first activity!
          </Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddForm(true)}
          >
            <Text style={styles.addButtonText}>Add Activity</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {Object.entries(groupedActivities).map(([date, dayActivities]) => (
            <View key={date} style={styles.dateGroup}>
              <Text style={styles.dateHeader}>{format(new Date(date), 'MMMM d, yyyy')}</Text>
              {dayActivities.map((activity) => (
                <View key={activity.id} style={styles.activityCard}>
                  <View style={styles.activityHeader}>
                    <Text style={styles.activityType}>{activity.type}</Text>
                    <Text style={styles.petName}>{activity.petName}</Text>
                  </View>
                  <View style={styles.activityDetails}>
                    <Text style={styles.detailText}>
                      Duration: {activity.duration} min
                    </Text>
                    {activity.distance && (
                      <Text style={styles.detailText}>
                        Distance: {activity.distance} km
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => {
                      setActivities(activities.filter(a => a.id !== activity.id));
                    }}
                  >
                    <Trash2 color="#EF4444" size={20} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E8FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#8B5CF6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B46C1',
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  activityType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  petName: {
    fontSize: 14,
    color: '#6B7280',
  },
  activityDetails: {
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#4B5563',
  },
  deleteButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B46C1',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

