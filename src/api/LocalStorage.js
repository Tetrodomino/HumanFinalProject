import { useNavigate } from "react-router-dom";

/** localStorage에 key 값을 만료시간을 두고 저장하기
 * @param {*} key 저장할 키 이름
 * @param {*} value 저장할 값
 * @param {*} ttl 만료시간 (1당 1분)
 */
export function SetWithExpiry(key, value, ttl) {
    const now = new Date();

    const item = {
        value: value,
        expiry: now.getTime() + ttl * 1000 * 60,
    }

    localStorage.setItem(key, JSON.stringify(item));
}

export function GetWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    const navigate = useNavigate();

    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > parseInt(item.expiry)) {
        localStorage.removeItem(key)
        if (key === 'uid' || key === 'email')
        {
            alert('세션이 만료되었습니다. 로그인이 필요합니다')
            navigate('/login')
        }
        return null;
    }

    if (key == "uid" && (isNaN(item.value) || item.value == null))
    {
        return -1;   
    }

    return item.value;
}