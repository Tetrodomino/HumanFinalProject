export function SetSession(key, value) {
    sessionStorage.setItem(key, value);
}

export function GetSession(key) {
    return sessionStorage.getItem(key);
}