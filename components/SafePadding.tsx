import React from 'react'
import { View, StyleSheet } from 'react-native'

export const PaddingTop = () => <View style={styles.paddingTop} />
export const PaddingBottom = () => <View style={styles.paddingBottom} />

const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: 20,
  },
  paddingBottom: {
    paddingBottom: 20,
  },
})
