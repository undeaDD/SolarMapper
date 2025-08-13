import React, { useState } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import {
  Gesture,
  GestureDetector,
  PointerType,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Svg, { Ellipse as E } from "react-native-svg";

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const MIN_X = -200;
const MAX_X = 200;
const MIN_Y = -200;
const MAX_Y = 200;

export type Ellipse = {
  x: number;
  y: number;
  startX: number;
  startY: number;
};

export default function DocumentView({
  uri,
  selectedTool,
}: {
  uri: string;
  selectedTool: number | null;
  style: ViewStyle;
}) {
  const newScale = useSharedValue(1);
  const prevScale = useSharedValue(1);

  const newOffsetX = useSharedValue(0);
  const newOffsetY = useSharedValue(0);
  const prevOffsetX = useSharedValue(0);
  const prevOffsetY = useSharedValue(0);

  const currentEllipse = useSharedValue<Ellipse | null>(null);

  const [ellipses, setEllipses] = useState<Ellipse[]>([]);
  const [currentEllipseJS, setCurrentEllipseJS] = useState<Ellipse | null>(
    null
  );

  const addEllipse = (ellipse: Ellipse) => {
    setEllipses((prev) => [...prev, ellipse]);
    setCurrentEllipseJS(null);
    currentEllipse.value = null;
  };

  const EllipsisViews = () => {
    let current;
    if (currentEllipseJS) {
      const rx = Math.abs(currentEllipseJS.x - currentEllipseJS.startX) / 2;
      const ry = Math.abs(currentEllipseJS.y - currentEllipseJS.startY) / 2;
      const cx = (currentEllipseJS.x + currentEllipseJS.startX) / 2;
      const cy = (currentEllipseJS.y + currentEllipseJS.startY) / 2;

      current = (
        <Svg
          style={{
            position: "absolute",
            left: cx - rx,
            top: cy - ry,
            zIndex: 20,
          }}
          width={rx * 2 + 4}
          height={ry * 2 + 4}
        >
          <E
            cx={rx + 2}
            cy={ry + 2}
            rx={rx}
            ry={ry}
            stroke="orange"
            strokeWidth={4}
            fill="transparent"
          />
        </Svg>
      );
    }

    return (
      <>
        {ellipses.map((e, i) => {
          // TODO: add global pan and pinch to ellipses ( PART: 1 )
          const rx = Math.abs(e.x - e.startX) / 2;
          const ry = Math.abs(e.y - e.startY) / 2;
          const cx = (e.x + e.startX) / 2;
          const cy = (e.y + e.startY) / 2;

          return (
            <Svg
              key={i}
              style={{
                position: "absolute",
                left: cx - rx,
                top: cy - ry,
                zIndex: 20,
              }}
              width={rx * 2 + 4}
              height={ry * 2 + 4}
            >
              <E
                cx={rx + 2}
                cy={ry + 2}
                rx={rx}
                ry={ry}
                stroke="orange"
                strokeWidth={4}
                fill="transparent"
              />
            </Svg>
          );
        })}
        {current}
      </>
    );
  };

  const pan = Gesture.Pan()
    .onBegin((e) => {
      if (e.pointerType === PointerType.STYLUS && selectedTool !== null) {
        // TODO: add global pan and pinch to ellipses ( PART 2 )
        currentEllipse.value = {
          x: e.x,
          y: e.y,
          startX: e.x,
          startY: e.y,
        };
        runOnJS(setCurrentEllipseJS)(currentEllipse.value);
      }
    })
    .onUpdate((e) => {
      if (
        e.pointerType === PointerType.STYLUS &&
        selectedTool !== null &&
        currentEllipse.value
      ) {
        const startX = currentEllipse.value.startX;
        const startY = currentEllipse.value.startY;

        // TODO: add global pan and pinch to ellipses ( PART 3 )
        const endX = e.x;
        const endY = e.y;

        currentEllipse.value = { x: endX, y: endY, startX, startY };
        runOnJS(setCurrentEllipseJS)({ ...currentEllipse.value });
        return;
      }

      if (e.pointerType === PointerType.STYLUS) return;

      newOffsetX.value = Math.max(
        MIN_X,
        Math.min(MAX_X, prevOffsetX.value + e.translationX)
      );
      newOffsetY.value = Math.max(
        MIN_Y,
        Math.min(MAX_Y, prevOffsetY.value + e.translationY)
      );
    })
    .onEnd((e) => {
      if (
        e.pointerType === PointerType.STYLUS &&
        selectedTool !== null &&
        currentEllipse.value
      ) {
        runOnJS(addEllipse)({ ...currentEllipse.value });
        return;
      }

      if (e.pointerType === PointerType.STYLUS) return;

      prevOffsetX.value = newOffsetX.value;
      prevOffsetY.value = newOffsetY.value;
    });

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      if (e.pointerType === PointerType.STYLUS) return;
      newScale.value = Math.max(
        MIN_SCALE,
        Math.min(MAX_SCALE, prevScale.value * e.scale)
      );
    })
    .onEnd(() => {
      prevScale.value = newScale.value;
    });

  const gesture = Gesture.Simultaneous(pan, pinch);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: newScale.value },
      { translateX: newOffsetX.value },
      { translateY: newOffsetY.value },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <Animated.Image
          source={{ uri }}
          style={[styles.image, animatedStyle]}
          resizeMode="contain"
        />
        {EllipsisViews()}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  image: { width: "100%", height: "100%" },
});
