import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Redirect } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import useUser from '@/hooks/useUser';
import { Goal } from '@/models/goalModel';
import { fetchGoals } from '@/api/goals';
import { getUserdbFromFireBase } from '@/api/auth';
import Card from '@/components/diary/card';

function GoalItem({ item, index }: { item: Goal; index: number }) {
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withDelay(index * 100, withTiming(1, { duration: 500 }));
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - animationProgress.value) * 20 }],
    opacity: animationProgress.value,
  }));

  return (
    <Animated.View style={[styles.animatedCard, animatedStyle]}>
      <Card>
        <View>
          <Text style={styles.activityText}>
            <Text style={styles.bold}>Goal: </Text>
            <Text>{item.type}</Text>
          </Text>
          <Text style={styles.activityText}>
            <Text style={styles.bold}>Target: </Text>
            <Text>{item.target}</Text>
          </Text>
          <Text style={styles.activityText}>
            <Text style={styles.bold}>Progress: </Text>
            <Text>{item.progress} </Text>
          </Text>
        </View>
      </Card>
    </Animated.View>
  );
}

export default function GoalScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [goals, setGoals] = useState<Goal[]>([]);
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
        const gls = await fetchGoals(userId);
        setGoals(gls);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    handleGetDbUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.header}>Goals</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : goals.length > 0 ? (
          <FlatList
            data={goals}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => <GoalItem item={item} index={index} />}
          />
        ) : (
          <Text style={styles.noActivitiesText}>Geen goals gevonden.</Text>
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
  animatedCard: {
    marginBottom: 16,
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
