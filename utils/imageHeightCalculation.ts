type ImageDimensions = {
    width: number
    height: number
    orientation: 'portrait' | 'landscape' | 'portrait-upside-down' | 'landscape-left' | 'landscape-right'
  }

  export default function calculateImageHeight(desiredWidth: number, imageDimensions: ImageDimensions): number {
    const dimensions = {...imageDimensions}
    if (imageDimensions.orientation.includes('portrait')) {
      dimensions.width = imageDimensions.height
      dimensions.height = imageDimensions.width
    }
  
    const aspectRatio = dimensions.width / dimensions.height
    return Math.ceil(desiredWidth / aspectRatio)
  }