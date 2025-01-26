import React, { ReactNode, useState } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  const [scale] = useState(new Animated.Value(1));

  const handlePinch = Animated.event(
    [{ nativeEvent: { scale } }],
    { useNativeDriver: true }
  );

  const handlePinchEnd = (event: PinchGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === 4) { // Gesture ended
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <GestureHandlerRootView>
      <PinchGestureHandler
        onGestureEvent={handlePinch}
        onHandlerStateChange={handlePinchEnd}
      >
        <Animated.View style={[styles.card, style, { transform: [{ scale }] }]}>
          {children}
        </Animated.View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
    borderRadius: 12, // Rounded corners
    padding: 16, // Internal padding
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow transparency
    shadowRadius: 6, // Shadow blur radius
    elevation: 5, // Shadow for Android
    marginBottom: 16, // Space between cards
  },
});

export default Card;
