import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';
import { supabase } from '../data/supabaseClient';
import { Goal } from '../models/goalModel';
import { fetchActivityTypeById } from './activityTypes';


export const useGetGoals = (userid: number): UseSuspenseQueryResult<Goal[], Error> => {
    return useSuspenseQuery({
      queryKey: ['goals'],
      queryFn: () => fetchGoals(userid),
    })
  }

export const fetchGoals = async (userId: number): Promise<Goal[]> => {
    const { data, error } = await supabase
      .from('Goal')
      .select('*')
      .eq('userId', userId)
 
  
    if (error) {
      console.error(error);
      return [];
    }

    const fullGoals = await Promise.all(data.map(async (goal) => {

     
      return {
        ...goal,
      };
    }))


    console.log("goals in meth VOL: ", fullGoals)
    return fullGoals as Goal[];
  };

