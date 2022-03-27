import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONT_SIZE } from 'utils/styleGlobal'
import { humanTime } from 'helper/NDate'

interface NewHeaderProps {
  dateTitle: string
  title: string
}

const NewHeader = ({ dateTitle, title }: NewHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dateTime}>{humanTime(dateTitle)}</Text>
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
    </View>
  )
}

NewHeader.defaultProps = {
  dateTitle: ""
};

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