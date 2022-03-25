import { StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NewHeader from 'components/news/NewHeader'
import * as rssParser from 'react-native-rss-parser'
import NewItem, { widthHeightNewItem } from 'components/news/NewItem'

const RSS = 'https://vnexpress.net/rss/tin-moi-nhat.rss'

const News = () => {

  const refScrollView = useRef(null)
  const [listNew, setListNew] = useState<Array<rssParser.FeedItem> | []>([])

  useEffect(() => {
    getListNew()
  }, [])

  const getListNew = async () => {
    return fetch(RSS)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss: rssParser.Feed) => {
        console.log(rss.items[0].description)
        setListNew(rss.items)

        
      });
  }

  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']} >
      <NewHeader />
      <ScrollView
        ref={refScrollView}
        contentContainerStyle={styles.scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        snapToAlignment='start'
        snapToInterval={widthHeightNewItem().width + 16 + 1}
      >
        {
          listNew.map((value: rssParser.FeedItem, idx: Number) => {
            return <NewItem data={value} key={idx.toString()} />
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 16,
    paddingEnd: 16
  }
})

export default News