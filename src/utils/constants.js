export const createFetchTemplate = (url, headers) =>
    fetch(url, headers)
        .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
        .catch(err => console.log(err));

export const convertDateFormat = (date) => {
    if (date.getMonth() === 0) {
        return `January ${date.getDate()}, ${date.getFullYear()}`;
    }
    if (date.getMonth() === 1) {
        return `February ${date.getDate()}, ${date.getFullYear()}`;
    }
    if (date.getMonth() === 2) {
        return `March ${date.getDate()}, ${date.getFullYear()}`;
    }
    if (date.getMonth() === 3) {
        return `April ${date.getDate()}, ${date.getFullYear()}`;
    }
    if (date.getMonth() === 4) {
        return `May ${date.getDate()}, ${date.getFullYear()}`;
    }
    if (date.getMonth() === 5) {
        return `June ${date.getDate()}, ${date.getFullYear()}`;
    }
    if (date.getMonth() === 6) {
        return `July ${date.getDate()}, ${date.getFullYear()}`;
    }
    if (date.getMonth() === 7) {
        return `August ${date.getDate()}, ${date.getFullYear()}`;
    }
    if (date.getMonth() === 8) {
        return `September ${date.getDate()}, ${date.getFullYear()}`;
    }
    if (date.getMonth() === 9) {
        return `October ${date.getDate()}, ${date.getFullYear()}`;
    }
    if (date.getMonth() === 10) {
        return `November ${date.getDate()}, ${date.getFullYear()}`;
    }
    if (date.getMonth() === 11) {
        return `December ${date.getDate()}, ${date.getFullYear()}`;
    }
}

export function getWeekAgoDate(today){
    const lastweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
    return lastweek.toISOString().split('T')[0]; 
}

export function normalizeString(keyword){
    return keyword[0].toUpperCase() + keyword.slice(1).toLowerCase();
}