import {FunctionComponent, PropsWithChildren} from 'react'
import {config} from './config'
import {useColorScheme, View, ViewProps} from 'react-native'
import {OverlayProvider} from '@gluestack-ui/overlay'
import {ToastProvider} from '@gluestack-ui/toast'

interface GluestackUiProviderProps extends PropsWithChildren {
  style?: ViewProps['style']
}

const GluestackUIProvider: FunctionComponent<GluestackUiProviderProps> = ({children, style}) => {
  const mode = useColorScheme() ?? 'light'

  return (
    <View style={[config[mode], {flex: 1, height: '100%', width: '100%'}, style]}>
      <OverlayProvider>
        <ToastProvider>{children}</ToastProvider>
      </OverlayProvider>
    </View>
  )
}

export default GluestackUIProvider
