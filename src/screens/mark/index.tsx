import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Mark = () => {
  return (
    <SafeAreaView edges={['right', 'top', 'left']} >
      <Text>Mark</Text>
    </SafeAreaView>
  )
}

export default Mark

const styles = StyleSheet.create({})