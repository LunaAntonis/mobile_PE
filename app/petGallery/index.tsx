import {FunctionComponent, useEffect, useState} from 'react'
import {Image, Pressable, ScrollView, useWindowDimensions, View} from 'react-native'
import {useNavigation} from 'expo-router'
import {CameraIcon} from 'lucide-react-native'
import CameraUI from '@/components/cameraUi'
import {PhotoFile} from 'react-native-vision-camera'
import {useMMKVObject} from 'react-native-mmkv'
import FlexSpaceBetweenLastRowFix from '@/components/flexSpace'
import calculateImageHeight from '@/utils/imageHeightCalculation'
import React from 'react';

const Index: FunctionComponent = () => {
  const navigation = useNavigation()
  const [showCamera, setShowCamera] = useState<boolean>(false)
  const [photos, setPhotos] = useMMKVObject<PhotoFile[]>('lecture3Photos')
  const dimension = useWindowDimensions()
  // Drie foto's naast elkaar, met een gap van 8px padding tussen de foto's en een marge langs de randen van 8px.
  const width = Math.ceil(dimension.width / 3 - 4 * 8)

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}: {tintColor: string}) => (
        <Pressable  className="rounded-full p-3.5" onPress={() => setShowCamera(true)}>
          <CameraIcon  color={tintColor} size={25} />
        </Pressable>
      ),
    })
  }, [navigation])

  return (
    <>
      <CameraUI
        showCamera={showCamera}
        cameraType="back"
        onClose={photo => {
          if (photo) {
            setPhotos([...(photos ?? []), photo])
          }
          setShowCamera(false)
        }}
      />
      <ScrollView>
        <View className="m-4 gap-2 flex justify-between flex-row flex-wrap">
          {photos?.map((photo, index) => (
            <Image
              style={{width, height: calculateImageHeight(width, photo)}}
              source={{...photo, uri: photo.path}}
              key={index}
              resizeMode="contain"
            />
          ))}

          <FlexSpaceBetweenLastRowFix itemsPerRow={3} totalItems={photos?.length ?? 0} style={{width}} />
        </View>
      </ScrollView>
    </>
  )
}

export default Index