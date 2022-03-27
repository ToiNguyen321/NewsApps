import NStorage, { BOOKMARK_NEW } from 'helper/NStorage'
import { useState, useEffect } from 'react'
import { Linking } from 'react-native'
import * as rssParser from 'react-native-rss-parser'
import { TypeNew } from 'screens/news/types'
import { convertUrlImageNew } from 'utils'

const RSS = 'https://vnexpress.net/rss/tin-moi-nhat.rss'

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

    const [titleNew, setTitleNew] = useState<string>('')
    const [listNew, setListNew] = useState<Array<TypeNew> | []>([])
    const [isFetchData, setisFetchData] = useState<Boolean>(true)

    useEffect(() => {
        getListNew()
    }, [])

    const getListNew = async () => {

        if (!isFetchData) setisFetchData(true)

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

        setListNew(news)
        setisFetchData(false)
        setTitleNew(rss.title)
    }

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
        isFetchData,
        listNew,
        titleNew,
        handleClickNew,
        onSaveBookmarkNew
    }
}

export default useNews