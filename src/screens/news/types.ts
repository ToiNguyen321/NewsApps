
export interface TypeLinks { 
    rel?: String 
    url?: String
}

export interface TypeNew {
    categories?: [],
    content?: String | undefined, 
    description?: String,
    enclosures?: [], 
    id?: String,
    links: Array<TypeLinks> | [],
    published?: Date, 
    title?: String 
}