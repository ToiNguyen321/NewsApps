export interface TypeCategories { 
    name: string
}

export interface TypeNew {
    categories?: Array<TypeCategories | undefined> | []
    image?: string
    id?: string
    link?: string
    published?: string
    title?: string
    isBookmark?: boolean | false
}