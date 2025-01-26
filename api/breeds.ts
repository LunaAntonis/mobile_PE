import { supabase } from '../data/supabaseClient';


export const fetchDogBreeds = async (): Promise<string[]> => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const data = await response.json();
      if (data.status === 'success') {
        // Extract breed names
        const breeds = Object.keys(data.message); 
        return breeds;
      }
      throw new Error('Failed to fetch breeds');
    } catch (error) {
      console.error('Error fetching dog breeds:', error);
      return [];
    }
  };
  

export const addBreedsToDatabase = async (breeds: string[]) => {
  try {
    const { data, error } = await supabase
      .from('Breed') 
      .insert(breeds.map((breed) => ({ name: breed }))); 

    if (error) throw error;

    console.log('Breeds added:', data);
  } catch (error) {
    console.error('Error adding breeds to database:', error);
  }
};

export const syncDogBreedsToDatabase = async () => {
    const breeds = await fetchDogBreeds();
    if (breeds.length > 0) {
      await addBreedsToDatabase(breeds);
    } else {
      console.error('No breeds to add to the database.');
    }
  };
  
