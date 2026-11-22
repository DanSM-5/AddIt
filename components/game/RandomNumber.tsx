import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { GameHighlightColors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export type NumberHighlight = "correct" | "wrong" | null;

// Button base colours are not themed yet (shared with the rest of the game screen).
const BASE_COLOR = "#2089dc";
const BASE_TEXT_COLOR = "white";

const FLASH_DURATION = 1200; // ms for each half of the flash (to blue / back)

const RandomNumber = ({
  number,
  isSelected,
  onPress,
  onPressDisabled,
  id,
  isActive,
  highlight = null,
  flash = false,
}: {
  number: number;
  isSelected: boolean;
  onPress: (id: number) => void;
  onPressDisabled: (id: number) => void;
  id: number;
  isActive: boolean;
  /** Static end-of-game highlight of the button background. */
  highlight?: NumberHighlight;
  /** Slow, repeating flash to the theme's blue (used to reveal the answer). */
  flash?: boolean;
}) => {
  const flashProgress = useSharedValue(0);

  useEffect(() => {
    if (!flash) {
      cancelAnimation(flashProgress);
      flashProgress.value = 0;
      return;
    }

    const easing = Easing.inOut(Easing.quad);
    flashProgress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: FLASH_DURATION, easing }),
        withTiming(0, { duration: FLASH_DURATION, easing }),
      ),
      -1, // until the game is reset
    );

    return () => cancelAnimation(flashProgress);
  }, [flash, flashProgress]);

  const palette =
    GameHighlightColors[useColorScheme() === "dark" ? "dark" : "light"];

  const isHighlighted = highlight !== null || flash;
  const baseColor =
    highlight === "correct"
      ? palette.correct
      : highlight === "wrong"
        ? palette.wrong
        : BASE_COLOR;
  // Highlighted buttons use the palette's text colour; on the default blue
  // keep white text and blend it towards the palette's as the flash peaks.
  const baseTextColor =
    highlight !== null ? palette.highlightedText : BASE_TEXT_COLOR;
  const flashColor = palette.flash;
  const flashTextColor = palette.highlightedText;

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      flashProgress.value,
      [0, 1],
      [baseColor, flashColor],
    ),
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      flashProgress.value,
      [0, 1],
      [baseTextColor, flashTextColor],
    ),
  }));

  const handlePress = () => {
    if (isSelected) {
      onPressDisabled(id);
    } else {
      onPress(id);
    }
  };

  // Highlighted numbers stay fully visible; the rest dim as before.
  const isDimmed = !isHighlighted && (isSelected || !isActive);

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!isActive}
      style={styles.touchable}
    >
      <Animated.View style={[styles["number-container"], circleAnimatedStyle]}>
        <Animated.Text
          style={[styles.random, textAnimatedStyle, isDimmed && styles.selected]}
        >
          {number}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  random: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  touchable: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  "number-container": {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 6,
  },
  selected: {
    opacity: 0.2,
  },
});

export default RandomNumber;
