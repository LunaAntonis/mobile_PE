import { ActivityType } from "./activityTypeModel";

export interface Activity {
    id: number;
    date: string;
    duration: number;
    distance?: number;
    activityType: ActivityType;
  }

