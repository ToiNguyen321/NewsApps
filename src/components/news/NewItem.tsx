import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS, FONT_SIZE } from 'utils/styleGlobal'
import { TypeNew } from 'screens/news/types'
import { ProgressiveImage } from 'components/ProgressiveImage'
import { timeAgo } from 'helper/NDate'

const { width } = Dimensions.get('window')

export function widthHeightNewItem() {
  const widthItem = (width - 16) / 3 * 2.2
  return {
    width: widthItem + 0.1
  }
}

interface NewItemProps {
  data: TypeNew,
  onClick?: () => void
  onBookmarkNew?: () => void
}

const NewItem = ({ data, onClick, onBookmarkNew }: NewItemProps) => {
  return (
    <TouchableHighlight style={styles.container} onPress={onClick}>
      <>
        <ProgressiveImage
          style={styles.bgImage}
          resizeMode='cover'
          source={{ uri: data.image }}
        />
        <View style={styles.vDetail}>
          <View style={styles.topContainer}>
            <Text style={styles.topTitle}>{data.categories ? data.categories.join(', ') : ''}</Text>
            <Text style={styles.topDateTime}>{timeAgo(data?.published ?? '')}</Text>
          </View>

          <View style={styles.midContainer}>
            <Text style={styles.midTitle} numberOfLines={3}>
              {data?.title}
            </Text>
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.bottomButton} >
              <Text style={styles.bottomButtonTitle}>Read</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
        style={styles.saveView} 
        activeOpacity={0.75} 
        hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
        onPress={onBookmarkNew}>
          <Feather size={24} color={data.isBookmark ? COLORS.BLUE : COLORS.WHITE} name={'bookmark'} />
        </TouchableOpacity>
      </>
    </TouchableHighlight>
  )
}

export default NewItem

const styles = StyleSheet.create({
  container: {
    width: widthHeightNewItem().width,
    height: '100%',
    marginLeft: 16,
    borderRadius: 10,
    overflow: 'hidden'
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  vDetail: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 8,
    marginBottom: 8,
    height: 170,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'column',
    width: widthHeightNewItem().width - 16,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topTitle: {
    fontSize: FONT_SIZE.CONTENT,
    color: COLORS.BLUE
  },
  topDateTime: {
    fontSize: FONT_SIZE.CONTENT,
    color: COLORS.TEXT_COLOR_DESCRIPTION,
    paddingLeft: 16
  },
  midContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  midTitle: {
    fontSize: FONT_SIZE.TITLE,
    color: COLORS.TEXT_COLOR,
    fontWeight: 'bold'
  },
  bottomContainer: {
    alignItems: 'flex-end'
  },
  bottomButton: {
    backgroundColor: COLORS.BLUE,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  bottomButtonTitle: {
    fontSize: FONT_SIZE.TINY,
    color: COLORS.WHITE,
    fontWeight: '600'
  },
  saveView: {
    position: 'absolute',
    top: 24,
    right: 24
  }
})