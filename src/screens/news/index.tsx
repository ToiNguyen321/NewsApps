import React, { useMemo } from 'react'
import { Linking, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NewHeader from 'components/news/NewHeader'
import useNews from 'hooks/useNews'
import LoaderPosition from 'components/LoaderPosition'
import ListNew from 'components/news/ListNew'
import { COLORS } from 'utils/styleGlobal'

const News = () => {

  const { isFetchData, listNew, titleNew, handleClickNew, onSaveBookmarkNew } = useNews()

  const isLoading: boolean = useMemo(() => { return isFetchData && listNew.length == 0 }, [isFetchData])

  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']} >
      { <LoaderPosition isLoading={isLoading} /> }
      { !isLoading && <NewHeader title={titleNew} /> }
      <ListNew isLoading={isLoading} data={listNew} onClickNew={handleClickNew} onBookmarkNew={onSaveBookmarkNew} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  }
})

export default News