import ImagePicker from 'react-native-image-picker'

export default function openImage() {
  const options = {
    title: 'Select Image',
    storageOptions: {
      name: '',
      skipBackup: true,
      path: 'images',
    }
  }

  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const image = {uri: response.uri, isStatic: true, name: 'image.jpg', type: 'image/jpg'}
        resolve(image)
      }
    })
  })
}