export function convertDateToString(date: Date) {
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();
    const stringDate = `${(dd > 9 ? '' : '0') + dd}/${(mm > 9 ? '' : '0') + mm}/${date.getFullYear()}`;
    const stringTime = `${(hh > 9 ? '' : '0') + hh}:${(mi > 9 ? '' : '0') + mi}:${(ss > 9 ? '' : '0') + ss}`;
    return `${stringDate} ${stringTime}`;
}