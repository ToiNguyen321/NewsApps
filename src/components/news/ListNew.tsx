import { StyleSheet, ScrollView, View, Text } from 'react-native'
import React from 'react'
import { TypeNew } from 'screens/news/types'
import NewItem from 'components/news/NewItem'
import { COLORS, FONT_SIZE } from 'utils/styleGlobal'

interface ListNewProps {
    data: Array<TypeNew>
    onClickNew: Function
    onBookmarkNew: Function
    isLoading: boolean
}

const ListNew = ({ data, onClickNew, isLoading, ...props }: ListNewProps) => {

    const renderItem = (value: TypeNew, idx: Number) => {
        let onClick = () => onClickNew(value.link)
        let onBookmarkNew = () => props.onBookmarkNew(value.id)
        return <NewItem data={value} key={'new' + (value.id ?? idx.toString())} onClick={onClick} onBookmarkNew={onBookmarkNew} />
    }

    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            horizontal
            scrollEventThrottle={1000}
            removeClippedSubviews={true}
            bounces={false}
        //page Item
        // pagingEnabled
        // decelerationRate={0}
        // snapToAlignment='start'
        // snapToInterval={widthHeightNewItem().width + 16 + 1}
        >
            {
                data.length == 0 && !isLoading ?
                    <View style={styles.emptyView}>
                        <Text style={styles.emptyTitle}>Data Empty</Text>
                    </View>
                    : data.map(renderItem)
            }
        </ScrollView>
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
    }
})