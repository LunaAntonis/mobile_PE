import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';
import { supabase } from '../data/supabaseClient';
import { Activity } from '../models/activityModel';
import { fetchActivityTypeById } from './activityTypes';



export const useGetActiv = (userid: number): UseSuspenseQueryResult<Activity[], Error> => {
    return useSuspenseQuery({
      queryKey: ['activs'],
      queryFn: () => fetchActivities(userid),
    })
  }

export const fetchActivities = async (userId: number): Promise<Activity[]> => {
    const { data, error } = await supabase
      .from('Activity')
      .select('*')
      .eq('userId', userId)
      .order('date', { ascending: false });
  
    if (error) {
      console.error(error);
      return [];
    }

    const fullActivities = await Promise.all(data.map(async (activity) => {

      // Activity is naam van uw tabel. En typeid is de naam van de kolom van de FK.
      const activityType = await fetchActivityTypeById(activity.typeId);
      return {
        ...activity,
        activityType,
      };
    }))


    console.log("Activiteits in meth VOL: ", fullActivities)
    return fullActivities as Activity[];
  };


export const useAddActivity = () => {
  const addActivity = async (activity: {
    typeId: number;
    petId: number;
    date: string;
    duration: number;
    userId: number;
    distance: number | null;
  }) => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .insert({
          typeId: activity.typeId,
          petId: activity.petId,
          date: activity.date,
          duration: activity.duration,
          userId: activity.userId,
          distance: activity.distance,
        });
      if (error) throw error;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    addActivity,
  };
};

