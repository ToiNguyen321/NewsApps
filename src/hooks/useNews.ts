import NStorage, { BOOKMARK_NEW } from 'helper/NStorage'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Linking } from 'react-native'
import * as rssParser from 'react-native-rss-parser'
import { TypeNew } from 'screens/news/types'
import { convertUrlImageNew } from 'utils'

const RSS = 'https://vnexpress.net/rss/tin-moi-nhat.rss'
const PAGE_SIZE = 10

function convertTypeNew(data: rssParser.Feed): Array<TypeNew> {
    try {
        let listNew: Array<TypeNew> = []
        data.items.map((value: rssParser.FeedItem) => {
            let newItem: TypeNew = {}

            newItem.id = value.id
            newItem.published = value.published
            newItem.image = convertUrlImageNew({ description: value.description })
            newItem.title = value.title
            newItem.categories = value.categories
            newItem.link = value.id
            listNew.push(newItem)
        })
        return listNew
    } catch (error) {
        return []
    }
}

const useNews = () => {

    let listNewTotal : Array<TypeNew> = []
    const [titleNew, setTitleNew] = useState<string>('')
    const [listNew, setListNew] = useState<Array<TypeNew>>([])
    const [isFetchData, setIsFetchData] = useState<boolean>(true)
    const [isLastData, setIsLastData] = useState<boolean>(false)

    useEffect(() => {
        getListTotalNew()
    }, [])

    const getListTotalNew = async () => {
        // if (!isFetchData) setIsFetchData(true)
        return fetch(RSS)
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then(handleData);
    }

    const handleData = async (rss: rssParser.Feed) => {
        let news = convertTypeNew(rss)
        let listBookmarkNew: Array<string> = await NStorage.getItem(BOOKMARK_NEW) ?? []
        news.map((value: TypeNew) => {
            if (value.id && listBookmarkNew.indexOf(value.id) != -1) {
                value.isBookmark = true
            }
        })

        listNewTotal = news
        setTitleNew(rss.title)
    }

    const getNewsByPage = useCallback((page: number) => {
        setIsFetchData(true)

        setTimeout(() => {
            let listNewCurrent = listNewTotal.slice(0, (page + 1) * PAGE_SIZE)
            if (listNewCurrent.length === listNewTotal.length) {
                setIsLastData(true)
            }else {
                setListNew(listNewCurrent)
            }
            setIsFetchData(false)
        }, 500)

    }, [listNewTotal.length])

    const handleClickNew = (url: string) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };

    const onSaveBookmarkNew = async (id: string) => {
        let listBookmarkNew: Array<string> = await NStorage.getItem(BOOKMARK_NEW) ?? []
        let listNewChange = [...listNew]
        let indexNewFromBookmark = listBookmarkNew.indexOf(id)

        if (indexNewFromBookmark === -1) {
            listBookmarkNew.push(id)
            listNewChange.map((value: TypeNew) => {
                if (value.id == id) {
                    value.isBookmark = true
                }
            })
        } else {
            listBookmarkNew.splice(indexNewFromBookmark, 1)
            listNewChange.map((value: TypeNew) => {
                if (value.id == id) {
                    value.isBookmark = false
                }
            })
        }

        await NStorage.setItem(BOOKMARK_NEW, listBookmarkNew)
        setListNew(listNewChange)
    }

    return {
        listNewTotal,
        isFetchData,
        isLastData,
        listNew,
        titleNew,
        handleClickNew,
        onSaveBookmarkNew,
        getNewsByPage
    }
}

export default useNews