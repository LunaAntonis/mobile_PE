import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Redirect, router } from 'expo-router';
import useUser from '@/hooks/useUser';
import { Activity } from '@/models/activityModel';
import Card from '@/components/diary/card';
import { fetchActivities, useGetActiv } from '@/api/activities';
import { getUserdbFromFireBase, useGetFirebaseUser } from '@/api/auth';
import { syncDogBreedsToDatabase } from '@/api/breeds';

export default function DiaryScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [activities, setActivities] = useState<Activity[]>([]);
  const user = useUser();

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

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const acts = await fetchActivities(userId);
        console.log('Activities:', acts);
        setActivities(acts);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    handleGetDbUser();
    syncDogBreedsToDatabase();
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.mainContent}>
        <Text style={styles.header}>Dagboek</Text>
        <TouchableOpacity onPress={() => router.push("/diary/addActivity")}>
        <Text style={styles.navLink}>Add Activity</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : activities.length > 0 ? (
          <FlatList
            data={activities}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card>
                <View>
                  <Text style={styles.activityText}>
                    <Text style={styles.bold}>Activiteit: </Text>
                    <Text>{item.activityType.name}</Text>
                  </Text>
                  <Text style={styles.activityText}>
                    <Text style={styles.bold}>Datum: </Text>
                    <Text>{new Date(item.date).toLocaleString()}</Text>
                  </Text>
                  <Text style={styles.activityText}>
                    <Text style={styles.bold}>Duur: </Text>
                    <Text>{item.duration} minuten</Text>
                  </Text>
                  {item.distance && (
                    <Text style={styles.activityText}>
                      <Text style={styles.bold}>Afstand: </Text>
                      <Text>{item.distance} m</Text>
                    </Text>
                  )}
                </View>
              </Card>
            )}
          />
        ) : (
          <Text style={styles.noActivitiesText}>Geen activiteiten gevonden.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B46C1',
    padding: 16,
  },
  decorativeIcons: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    gap: 8,
  },
  iconText: {
    fontSize: 20,
    color: '#F6AD55',
  },
  navigation: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  navLink: {
    color: '#FFFFFF',
    marginHorizontal: 8,
    fontSize: 16,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
  },
  datePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  datePickerLabel: {
    color: '#FFFFFF',
    marginRight: 8,
    fontSize: 16,
  },
  dateInput: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#FFFFFF',
    flex: 1,
  },
  activityText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  noActivitiesText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 16,
  },
});
