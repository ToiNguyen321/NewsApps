export const timeAgo = (prevDate: string) : string => {
    const diff = Number(new Date()) - new Date(prevDate).getTime();
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
        case diff < minute:
            const seconds = Math.round(diff / 1000);
             return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`
        case diff < hour:
            return Math.round(diff / minute) + ' minutes ago';
        case diff < day:
            return Math.round(diff / hour) + ' hours ago';
        case diff < month:
            return Math.round(diff / day) + ' days ago';
        case diff < year:
            return Math.round(diff / month) + ' months ago';
        case diff > year:
            return Math.round(diff / year) + ' years ago';
        default:
            return "";
    }
}

export function humanTime(timeStamp: string) {
   const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   let D = new Date(timeStamp); // 23 Aug 2016 <-- Desired format.
   if (!timeStamp) {
       D = new Date()
   }
   return D.getDate() + " " + M[D.getMonth()] + " " + D.getFullYear();
}