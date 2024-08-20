import { Image, StyleSheet, Dimensions } from 'react-native';
import { useState } from 'react';
import  * as ImagePicker from 'expo-image-picker'
import Carousel from 'react-native-reanimated-carousel';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const [images, setImages] = useState<any[]>([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  const renderCarouselItem = ({ item, index }: {item: any, index: number}) => {
    return (
      <ThemedView key={index} style={{ backgroundColor: 'white', borderRadius: 5, height: 250, padding: 10 }}>
        <Image source={{ uri: item.uri }} style={{ width: '100%', height: '100%' }} />
      </ThemedView>
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Click the button to pick a image</ThemedText>
        <ThemedButton title='Pick an image from camera roll' onPress={pickImage} />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
      {images.length > 0 ? (
        <Carousel
          loop
          data={images}
          autoPlay={true}
          renderItem={renderCarouselItem}
          scrollAnimationDuration={1000}
          width={screenWidth - 60}
          height={(screenWidth - 60) / 2}
        />
      ) : (
        <ThemedText type="title">No images selected yet.</ThemedText>
      )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  image: {
    height: 200,
    width: 'auto',
  }
});
