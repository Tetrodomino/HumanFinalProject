import axios from "axios";
import { useState } from "react";

// uid로 user 정보 받아오기
export function useGetUser(uid) {
    const [user, setUser] = useState({
        id: uid,
        email: '',
        profile: '',
        uname: '',
        nickname: '',
        statusMessage: '',
        snsDomain: '',
        status: 0,
        regDate: null,
        gender: -1,
        provider: 0,
        birth: null,
        tel: '',
        hashUid: '',
    });

    axios.get('http://localhost:8090/user/getUser', {
        params: {
            uid: uid
        }
    }).then(res => {
        setUser(res.data);
    }).catch(error => console.log(error));

    return user;
}

// 보드 리스트 받기
export function useGetBoardList(query, count, field) {


}