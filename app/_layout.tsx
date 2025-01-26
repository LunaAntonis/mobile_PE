import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaView } from "react-native-safe-area-context";
import LogoutButton from "@/components/diary/logoutButton";
import {StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GluestackUIProvider } from "@/components/gluestack-ui-provider/index.web";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !__DEV__,
      staleTime: Infinity,
    },
  },
})



export default function RootLayout() {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={[{flex: 1}]}>
    <QueryClientProvider client={queryClient}>
    <GluestackUIProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Algemene navigatiebalk */}
        <View style={styles.navbar}>
          <View style={styles.navLinks}>
            <TouchableOpacity onPress={() => router.push("/diary")}>
              <Text style={styles.navLink}>Diary</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/goals")}>
              <Text style={styles.navLink}>Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/map")}>
              <Text style={styles.navLink}>Map</Text>
            </TouchableOpacity>
          </View>
          <LogoutButton />
        </View>

        {/* Content */}
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: 'Home',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="diary"
            options={{
              title: 'Diary',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="goals"
            options={{
              title: 'Goals',
              headerShown: false,
            }}
          />
             <Stack.Screen
            name="map"
            options={{
              title: 'Map',
              headerShown: false,
            }}
          />
        </Stack>
      </SafeAreaView>
      </GluestackUIProvider>
    </QueryClientProvider>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6B46C1',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F6AD55',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    color: '#FFFFFF',
    fontSize: 16,
    marginHorizontal: 12,
  },
});