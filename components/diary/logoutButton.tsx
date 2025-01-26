import { useGetCurrentUser, useSignOut } from "@/api/auth";
import useUser from "@/hooks/useUser";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";

const LogoutButton: React.FC = () => {
  const user = useUser(); // Altijd aangeroepen
  const { mutate: signout } = useSignOut(); // Altijd aangeroepen

  const LogoutFunc = () => {
    signout();
  };

  return (
    <View style={styles.container}>
      {!user ? null : (
        <TouchableOpacity style={styles.button} onPress={LogoutFunc}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 100, // Ensure the button stays on top
  },
  button: {
    backgroundColor: "#FF6B6B", // Red background
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default LogoutButton;
