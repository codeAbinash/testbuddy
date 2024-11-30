/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Press from '@components/Press'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
// import {PaddingBottom, PaddingTop} from '@components/SafePadding';
import React from 'react'
import { StatusBar, Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar barStyle='dark-content' backgroundColor={'transparent'} />
        <PaddingTop />
        <Press>
          <Text style={{ textAlign: 'center', fontSize: 30, fontFamily: 'monospace', fontWeight: 'bold' }}>
            Testbuddy
          </Text>
        </Press>
        <PaddingBottom />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default App
