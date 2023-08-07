import { Canvas, Group, Image, RoundedRect, Shadow, rect, rrect, runTiming, useImage, useTouchHandler, useValue } from '@shopify/react-native-skia';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

const DarkModeToggle = () => {
  const xVal = useValue(11);
  const [isDark, setIsDark] = useState<boolean>(false);
  const onTouch = useTouchHandler({
    onStart: () => {
      setIsDark(prev => !prev);
      runTiming(xVal, xVal.current === 11 ? 32 : 11, { duration: 200 });
    }
  });
  const borderRect = rrect(rect(5, 5, 50, 30), 18, 18);
  const innerRect = rrect(rect(8, 8, 44, 24), 18, 18);
  const sunImg = useImage(require('@images/sun.png'));
  const moonImg = useImage(require('@images/moon.png'));
  return (
    <Canvas style={styles.container} onTouch={onTouch}>
      <Group>
        <RoundedRect rect={borderRect} color="white">
          <Shadow dx={-1} dy={-1} blur={2} color="white" />
          <Shadow dx={1} dy={1} blur={2} color="rgba(174, 174, 192, .4)" />
        </RoundedRect>
        <RoundedRect rect={innerRect} color="white">
          <Shadow dx={-1} dy={-1} blur={1} color="rgba(255, 255, 255, .7)" inner />
          <Shadow dx={1.5} dy={1.5} blur={2} color="rgba(174, 174, 192, .2)" inner />
        </RoundedRect>
      </Group>
      <Image image={isDark ? moonImg : sunImg} x={xVal} y={11} width={18} height={18}>
        <Shadow dx={-1} dy={-1} blur={2} color="white" />
        <Shadow dx={1} dy={1} blur={2} color="rgba(174, 174, 192, .4)" />
      </Image>
    </Canvas>
  );
};

export default DarkModeToggle;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 60
  },

});