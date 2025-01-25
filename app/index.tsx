import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';


const { width } = Dimensions.get('window');

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        {/* Top dots */}
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Decorative elements */}
        {/* <Image
          // source={require('./assets/bone.png')}
          style={[styles.decorative, styles.bone]}
        />
        <Image
          // source={require('./assets/paw.png')}
          style={[styles.decorative, styles.paw]}
        /> */}

        {/* Main content */}
        <View style={styles.content}>
          {/* Circle background for mascot */}
          <View style={styles.mascotContainer}>
            <View style={styles.mascotCircle}>
              <Image
                source={require('../assets/images/chonky-doggo.png')}
                style={styles.mascot}
              />
            </View>
          </View>

          {/* App title and subtitle */}
          <Text style={styles.title}>Pawfect</Text>
          <Text style={styles.subtitle}>THE DOG FITNESS APP</Text>

          {/* Login button */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

            {/* Create account link */}
            <TouchableOpacity style={styles.createAccountContainer}>
            <Text style={styles.createAccountText}>Don't have an account? </Text>
            <Text style={[styles.createAccountText, styles.createAccountLink]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9C3FB4',
  },
  background: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#9C3FB4',
  },
  dots: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
    marginLeft: 12,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFD700',
  },
  decorative: {
    width: 24,
    height: 24,
    position: 'absolute',
    tintColor: '#FFD700',
  },
  bone: {
    top: '25%',
    right: '15%',
  },
  paw: {
    top: '28%',
    right: '25%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
  },
  mascotContainer: {
    width: width * 0.7,
    height: width * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotCircle: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascot: {
    width: '80%',
    height: '80%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFD700',
    marginTop: 8,
    letterSpacing: 1,
  },
  loginButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 40,
    width: '80%',
  },
  loginText: {
    color: '#832D99',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  createAccountContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  createAccountText: {
    color: '#FFD700',
    fontSize: 14,
  },
  createAccountLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
