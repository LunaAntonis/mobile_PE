import { supabase } from "@/data/supabaseClient";
import { Activity } from "@/models/activityModel";
import { ActivityType } from "@/models/activityTypeModel";

export const fetchActivityTypes = async (): Promise<ActivityType[]> => {
    const { data, error } = await supabase
      .from('ActivityType')
      .select('*');
  
    if (error) {
      console.error(error);
      throw error;
    }

    console.log("ActiviteitTypes: ", data)
    return data as ActivityType[];
};

export const fetchActivityTypeById = async (id: number): Promise<ActivityType> => {
    const { data, error } = await supabase
      .from('ActivityType')
      .select('*')
      .eq('id', id);
  
    if (error) {
      console.error(error);
      throw error;
    }

    console.log("ActiviteitTypes: ", data)
    // Je krijgt sowieso een lijst terug ookal specifier je geen array. Dus we willen zwz de eerste van de lijst.
    return data[0] as ActivityType;
};