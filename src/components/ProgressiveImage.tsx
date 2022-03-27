import React, { useState } from 'react';
import { Animated, ImageProps, ImageStyle, StyleSheet, View } from 'react-native';
import LoaderPosition from './LoaderPosition';

interface ProgressiveImageProps extends ImageProps {
  source: any
  style: ImageStyle
  resizeMode: any
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flex: 1
  },
});

export const ProgressiveImage = ({
  style,
  ...props
}: ProgressiveImageProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const imageAnimated = new Animated.Value(0);

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      setIsLoading(false)
    });
  };

  return (
    <View style={styles.container}>
      <LoaderPosition isLoading={isLoading} />
      <Animated.Image
        style={[{ opacity: imageAnimated }, style]}
        {...props}
        onLoad={onImageLoad}
      />
    </View>
  );
};