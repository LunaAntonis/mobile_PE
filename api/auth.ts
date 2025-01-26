import {useMutation, UseMutationResult, useQuery, useQueryClient} from '@tanstack/react-query'
import auth from '@react-native-firebase/auth'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {AuthCredential, User} from '@/models/firebaseTypes'
import { supabase } from '@/data/supabaseClient'

//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export function useSignOut(): UseMutationResult<void, Error, void, void> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signOut,
    onSettled: () => queryClient.invalidateQueries({queryKey: ['currentUser']}),
  })
}

export function useSignIn(): UseMutationResult<User | null, Error, SignInParams, void> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signIn,
    onSettled: () => queryClient.invalidateQueries({queryKey: ['currentUser']}),
  })
}

export function useGetCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    // Aangezien de gebruiker nooit kan wijzigen tenzij de gebruiker uitlogt, kunnen we de staleTime en cacheTime op
    // Infinity zetten.
    gcTime: Infinity,
    staleTime: Infinity,
  })
}

//endregion

//region API functions

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

export enum AuthProvider {
  GOOGLE = 'google.com',
}

interface SignInParams {
  provider: AuthProvider
}

async function signIn({provider}: SignInParams): Promise<User | null> {
  let credential: AuthCredential | null = null
  switch (provider) {
    case AuthProvider.GOOGLE:
      credential = await createGoogleCredential()
      break
    default:
      throw new Error('Invalid provider')
  }

  if (!credential) return null

  const userCredential = await auth().signInWithCredential(credential)

  await getUserdbFromFireBase(userCredential.user.email)

  return userCredential.user
}

async function signOut(): Promise<void> {
  const user = getCurrentUser()

  if (user === null) {
    return
  }

  // Log uit bij Firebase.
  await auth().signOut()

  // Log uit bij de Identity Provider.
  switch (user.providerData[0].providerId) {
    case AuthProvider.GOOGLE.toString():
      await GoogleSignin.signOut()
      break
    default:
      throw new Error('Invalid provider')
  }
}

GoogleSignin.configure({webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID})

async function createGoogleCredential(): Promise<AuthCredential | null> {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true})

  // Get the users ID token
  const signInResult = await GoogleSignin.signIn()

  // Retrieve the ID Token
  const idToken = signInResult.data?.idToken

  if (!idToken) {
    throw new Error('No ID token found')
  }

  // Create a Google credential with the token
  return auth.GoogleAuthProvider.credential(idToken)
}

export function getCurrentUser(): User | null {
  return auth().currentUser
}

//get id from user from db supabase
export async function getUserIdSupabase(){

  //data is hier id uit users    
  const{data, error} = await supabase
  //tabel naam
  .from('User')
  .select("id")

  if(error || data == null){
    console.error(error)
    throw error
  }

  //dus als tabel leeg is en er nog geen id is
  if(data?.length == 0){
    return 1     
  }

  return data[data.length -1].id + 1
}

//methode wanneer iemand zich voor de eerste keer registreerd in firebase, een nieuwe user in supabase aanmaken. 
export async function createUserSupabasse(email: string){
  //supabase stuurt niks terug behalve evt een error -> dus enkel{error}
  const{error} = await supabase
  .from('User')
  .insert([
    {id: await getUserIdSupabase(), email}
  ])

  if(error){
    console.error(error)
    throw error
  }
}

//functie om kijken of user bestaat obv email die we meekrijgen uit firebase, anders aanmaken
export async function getUserdbFromFireBase(email:string | null) {
  console.log('OOK HIER GERAAK IK')
  if (email == null) {
    return null
  }

  const{data,error} = await supabase
  .from('User')
  .select('*')
  .eq('email', email)

  if(error){
    console.error(error)
    throw error
  }
  
  if (data.length == 0) {
    await createUserSupabasse(email)
  }

  console.log('WAAAAAAAAAAAAAAAAAT: ',data[0])
  return data[0]
}

export function useGetFirebaseUser(email: string) {
  console.log('useGetFirebaseUser called with email:', email);
  const {status, data, error} = useQuery({
    queryKey: ['usertje', email], // Include email in queryKey
    queryFn: () => {
      console.log("Jef is de naam van een koning in bulgarijje");
      return getUserdbFromFireBase(email)
    },
    // Aangezien de gebruiker nooit kan wijzigen tenzij de gebruiker uitlogt, kunnen we de staleTime en cacheTime op
    // Infinity zetten.
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: true,
  })

  console.log("status: ", status);
  console.log("data: ", data);
  console.log("error: ", error);
  
}

//endregion
