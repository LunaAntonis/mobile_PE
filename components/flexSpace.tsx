import {ComponentProps, FunctionComponent} from 'react'
import {View} from 'react-native'

interface FlexSpaceBetweenLastRowFixProps {
  itemsPerRow: number
  totalItems: number
  style: ComponentProps<typeof View>['style']
}


const FlexSpaceBetweenLastRowFix: FunctionComponent<FlexSpaceBetweenLastRowFixProps> = ({
  itemsPerRow,
  totalItems,
  style,
}) => {
  const itemsNeededToJustifyCorrectly = itemsPerRow - (totalItems % itemsPerRow)

  return Array(itemsNeededToJustifyCorrectly === itemsPerRow ? 0 : itemsNeededToJustifyCorrectly)
    .fill(null)
    .map((_, index) => <View style={style} key={index} />)
}

export default FlexSpaceBetweenLastRowFix