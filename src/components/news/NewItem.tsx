import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONT_SIZE } from 'utils/styleGlobal'
import * as rssParser from 'react-native-rss-parser'

const { width } = Dimensions.get('window')

export function widthHeightNewItem() {
  const widthItem = (width - 16) / 3 * 2.2
  return {
    width: widthItem + 0.1
  }
}

interface NewItemProps {
  data?: rssParser.FeedItem
}

const NewItem = ({ data }: NewItemProps) => {
    
  function getImage(): String {
    const s = data?.description;
    const matches: String = s?.matchAll(/<img src="(.*?)" >/g);
    const images = Array.from(matches, x => x[1])

    if (images.length > 0) {
      return images[0]
    }

    return "https://i1-vnexpress.vnecdn.net/2022/03/24/x2-7194-1592382404-jpeg-164810-2718-2714-1648106736.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=s2DXxkIZxpfATPmYQoQlag"
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        resizeMode='cover'
        resizeMethod="resize"
        source={{ uri: getImage() }}>
        <View style={styles.vDetail}>

          <View style={styles.topContainer}>
            <Text style={styles.topTitle}>{data?.categories.join(', ')}</Text>
            <Text style={styles.topDateTime}>7 min read</Text>
          </View>

          <View style={styles.midContainer}>
            <Text style={styles.midTitle} numberOfLines={3}>
              {data?.title}
            </Text>
          </View>

          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.bottomButton}>
              <Text style={styles.bottomButtonTitle}>Read</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    </View>
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
  bgImage: { flex: 1, justifyContent: 'flex-end' },
  vDetail: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 8,
    marginBottom: 8,
    height: 170,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'column',
    width: widthHeightNewItem().width - 16,
    justifyContent: 'space-between'
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
    color: COLORS.TEXT_COLOR_DESCRIPTION
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
  }
})