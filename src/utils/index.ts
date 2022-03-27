export function convertUrlImageNew({ description }: { description: string }): string {
    const matches = description.matchAll(/<img src="(.*?)" >/g)

    const images = Array.from(matches, x => x[1])

    if (images.length > 0) {
        return images[0]
    }

    return "https://i1-vnexpress.vnecdn.net/2022/03/24/x2-7194-1592382404-jpeg-164810-2718-2714-1648106736.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=s2DXxkIZxpfATPmYQoQlag"
}