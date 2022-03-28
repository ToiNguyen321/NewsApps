import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { TypeNew } from 'screens/news/types'
import NewItem, { widthHeightNewItem } from 'components/news/NewItem'
import { COLORS, FONT_SIZE } from 'utils/styleGlobal'

interface ListNewProps {
    data: Array<TypeNew>
    onClickNew: Function
    onBookmarkNew: Function
    isFetchData: boolean
    nextPage: () => void
}

const ListNew = ({ data, onClickNew, isFetchData, nextPage, ...props }: ListNewProps) => {

    const renderItem = ({ item, index }: { item: TypeNew, index: Number }) => {
        let onClick = () => onClickNew(item.link)
        let onBookmarkNew = () => props.onBookmarkNew(item.id)
        return <NewItem data={item} key={'new' + (item.id ?? index.toString())} onClick={onClick} onBookmarkNew={onBookmarkNew} />
    }

    const listEmptyComponent = () => {
        if (isFetchData && data.length === 0) return null
        return (
            <View style={styles.emptyView}>
                <Text style={styles.emptyTitle}>Data Empty</Text>
            </View>
        )
    }

    const listFooterComponent = () => {
        if (data.length !== 0 && isFetchData) {
            return <View style={styles.listFooterComponent}>
                <ActivityIndicator size={'large'} />
            </View>
        }
        return null;
    }

    const keyExtractor = (item: TypeNew, index: number) => 'new' + (item.id ?? index.toString())

    const getItemLayout = (_: any, index: number) => (
        {
            length: widthHeightNewItem().width + 16,
            offset: (widthHeightNewItem().width + 16) * index,
            index
        }
    )

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal
            contentContainerStyle={styles.scrollView}
            getItemLayout={getItemLayout}
            onEndReached={nextPage}
            initialNumToRender={10}
            onEndReachedThreshold={0.4}
            ListFooterComponent={listFooterComponent}
            ListEmptyComponent={listEmptyComponent}
        />
    )
}

export default ListNew

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        paddingBottom: 16,
        paddingEnd: 16
    },
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyTitle: {
        fontSize: FONT_SIZE.HEADER,
        fontWeight: 'bold',
        color: COLORS.TEXT_COLOR_DESCRIPTION
    },
    listFooterComponent: {
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }
})