import { useDocuments } from "@/provider/DocumentProvider";
import { Ellipse, useEllipses } from "@/provider/EllipseProvider";
import { useTools } from "@/provider/ToolProvider";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
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

export default function DocumentView() {
  const { ellipses, setEllipses, showEllipses } = useEllipses();
  const { selectedDocument } = useDocuments();
  const { selectedTool } = useTools();

  const newScale = useSharedValue(1);
  const prevScale = useSharedValue(1);

  const newOffsetX = useSharedValue(0);
  const newOffsetY = useSharedValue(0);
  const prevOffsetX = useSharedValue(0);
  const prevOffsetY = useSharedValue(0);

  const currentEllipse = useSharedValue<Ellipse | null>(null);
  const [currentEllipseJS, setCurrentEllipseJS] = useState<Ellipse | null>(
    null
  );

  const addEllipse = (ellipse: Ellipse) => {
    setEllipses((prev: Ellipse[]) => [
      ...prev,
      { ...ellipse, toolType: selectedTool?.id ?? null },
    ]);
    setCurrentEllipseJS(null);
    currentEllipse.value = null;
  };

  const renderEllipse = (ellipse: Ellipse) => {
    const rx = Math.abs(ellipse.x - ellipse.startX) / 2;
    const ry = Math.abs(ellipse.y - ellipse.startY) / 2;
    const cx = (ellipse.x + ellipse.startX) / 2;
    const cy = (ellipse.y + ellipse.startY) / 2;

    let stroke = "orange";
    let strokeDasharray: string | undefined = undefined;
    let fill = "transparent";

    switch (ellipse.toolType) {
      case 0:
        stroke = "orange";
        fill = "rgba(255,165,0,0.2)";
        break;
      case 1:
        stroke = "none";
        fill = "rgba(255,165,0,0.2)";
        break;
      case 2:
        stroke = "orange";
        strokeDasharray = "5,5";
        fill = "transparent";
        break;
      case 3:
        stroke = "gray";
        fill = "rgba(128,128,128,0.2)";
        break;
      case 4:
        stroke = "red";
        fill = "rgba(255,0,0,0.2)";
        break;
      default:
        stroke = "orange";
        fill = "transparent";
    }

    return (
      <Svg
        key={`${cx}-${cy}-${rx}-${ry}-${ellipse.toolType}`}
        style={{
          position: "absolute",
          left: cx - rx,
          top: cy - ry,
          zIndex: 20,
        }}
        width={rx * 2 + 6}
        height={ry * 2 + 6}
      >
        <E
          cx={rx + 3}
          cy={ry + 3}
          rx={rx}
          ry={ry}
          stroke={stroke}
          strokeWidth={stroke === "none" ? 0 : 4}
          strokeDasharray={strokeDasharray}
          fill={fill}
        />
      </Svg>
    );
  };

  const EllipsisViews = () => {
    return (
      <>
        {ellipses.map((e, i) => renderEllipse(e))}
        {currentEllipseJS && renderEllipse(currentEllipseJS)}
      </>
    );
  };

  const pan = Gesture.Pan()
    .onBegin((e) => {
      if (e.pointerType === PointerType.STYLUS && selectedTool !== null) {
        currentEllipse.value = {
          x: e.x,
          y: e.y,
          startX: e.x,
          startY: e.y,
          toolType: selectedTool?.id ?? 0,
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

        const endX = e.x;
        const endY = e.y;

        currentEllipse.value = {
          x: endX,
          y: endY,
          startX,
          startY,
          toolType: currentEllipse.value.toolType,
        };
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
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={animatedStyle}>
          <Image
            source={{ uri: selectedDocument?.url, width: 794, height: 1123 }}
            style={styles.image}
            resizeMode="contain"
          />
          {showEllipses && <EllipsisViews />}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { flex: 1 },
});

/*
Current functionality: newly drawn ellipse with pen gets stored in currentEllipse shared value. After pen lift / pan onEnd the currentEllipse gets stored inside the ellipses state array.

I need a step in-between. 

After I one the initial pan gesture . I want to store the ellipses in a floating state. And only store it in the state array after a button press.

- The floating ellipse should have a dashed rectangular border.
- the floating ellipse can be dragged inside the border to move it somewhere else 
- the floating ellipse can be dragged on the edges to scale it in that direction ( manipulate the ellipse edge points )
- the floating ellipse should have at least two buttons attached ( maybe inside centered ) -> discard and save button 
  - the discard button button removes it completely, the save button saves the floating ellipse in the state array
- the scale and drag actions should only be possible via stylus ( there are examples in the code already )
*/
