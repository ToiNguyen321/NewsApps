import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONT_SIZE } from 'utils/styleGlobal'

const NewHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.dateTime}>WED, OCT 16</Text>
      <Text style={styles.title}>World News</Text>
    </View>
  )
}

export default NewHeader

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    dateTime: {
        color: COLORS.TEXT_COLOR_DESCRIPTION,
        fontSize: FONT_SIZE.CONTENT,
        fontWeight: '600'
    },
    title: {
        color: COLORS.TEXT_COLOR,
        fontSize: FONT_SIZE.BIG_HEADER,
        fontWeight: 'bold'
    }
})