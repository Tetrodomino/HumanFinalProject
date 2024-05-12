import axios from "axios";
import { useEffect, useState } from "react";
import { GetWithExpiry } from "./LocalStorage";
import { useQuery } from "@tanstack/react-query";

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

// LocalStorage에서 uid 이용해서 nickname 받기
export function useGetUserNicknameLS() {
    const uid = GetWithExpiry("uid");

    const { isLoading, data } = useQuery({
        queryKey: ['getNickname'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8090/user/getUser', {
                params: {
                  uid: uid,
                }
            });

            return res.data;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    if (!isLoading && (data.nickname == '' || data.nickname == null))
    {
        return data.email;
    }
    else if (!isLoading && (data.nickname != '' && data.nickname != null))
    {
        return data.nickname;
    }
}