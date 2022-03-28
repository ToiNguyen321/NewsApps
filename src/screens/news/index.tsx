import React, { useEffect, useMemo, useState } from 'react'
import { Linking, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NewHeader from 'components/news/NewHeader'
import useNews from 'hooks/useNews'
import LoaderPosition from 'components/LoaderPosition'
import ListNew from 'components/news/ListNew'
import { COLORS } from 'utils/styleGlobal'

const News = () => {

  const [page, setPage] = useState<number>(0)

  const { isFetchData, isLastData, listNew, titleNew, handleClickNew, onSaveBookmarkNew, getNewsByPage } = useNews()

  useEffect(() => {
    getNewsByPage(page)
  }, [page])

  const nextPage = () => {
    if (isLastData || isFetchData) return
    setPage(page + 1)
  }

  const isLoading: boolean = useMemo(() => { return isFetchData && listNew.length == 0 }, [isFetchData])

  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']} >
      {<LoaderPosition isLoading={isLoading} />}
      {!isLoading && <NewHeader title={titleNew} />}
      <ListNew
        isFetchData={isFetchData}
        data={listNew}
        onClickNew={handleClickNew}
        onBookmarkNew={onSaveBookmarkNew}
        nextPage={nextPage}
      />
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