import axios from "axios";
import { useEffect, useState } from "react";
import { GetWithExpiry } from "../../api/LocalStorage";


export function useGetBoardList(count, update, uid) {
    const [dataList, setDataList] = useState([]);
    
    useEffect(() => {
        if (count > 0)
        {
            axios.get('http://localhost:8090/board/list', {
                params: {
                  c: count,
                  uid: uid,
                }
            }).then(res => {
                const formData = res.data.map(item => ({
                    title: item.title,
                    bContents: item.bContents,
                    image: item.image.split(','),
                    modTime: item.modTime,
                    likeCount: item.likeCount,
                    replyCount: item.replyCount,
                    uid: item.uid,
                    bid: item.bid,
                    liked: item.liked,
                    profile: item.profile,
                }));
                setDataList(formData);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [update])

    return dataList;
}

export function useGetBoard(bid: int, open: Boolean, update: Boolean, uid: int) {
    const [board, setBoard] = useState({});

    useEffect(() => {
        if (bid != null && open == true)
        {
            axios.get('http://localhost:8090/board/getBoard', {
                params: {
                  bid: bid,
                  uid: uid,
                }
            }).then(res => {
                const formData = {
                    title: res.data.title,
                    bContents: res.data.bContents,
                    image: res.data.image.split(','),
                    modTime: res.data.modTime,
                    likeCount: res.data.likeCount,
                    replyCount: res.data.replyCount,
                    uid: res.data.uid,
                    bid: res.data.bid,
                    liked: res.data.liked,
                    profile: res.data.profile,
                }
                setBoard(formData);
            }).catch(error => console.log(error));
            
        }
    }, [open, update])

    return board;
}

export function useGetReplyList(bid: int, open: Boolean, update: Boolean, count: int, uid: int) {
    const [replyList, setReplyList] = useState([]);

    useEffect(() => {
        if (bid != null && open == true)
        {
            axios.get('http://localhost:8090/board/replyList', {
                params: {
                  bid: bid,
                  offset: 0,
                  limit: count
                }
            })
                .then(res => {
                  const formData = res.data.map(item => ({
                    rContents: item.rContents,
                    modTime: item.modTime,
                    likeCount: item.likeCount,
                    nickname: item.nickname,
                  }));
                  setReplyList(formData);
                })
                .catch(err => {
                  console.log(err);
                });
        }
    }, [open, update])

    return replyList;
}

export function useGetBoardByUrl(url: String, uid: int) {
    const [board, setBoard] = useState({});

    useEffect(() => {
        if (url != null && url != '')
        {
            axios.get('http://localhost:8090/board/getBoardUrl', {
                params: {
                    url: url,
                    uid: uid,
                }
            }).then(res => {
                const formData = {
                    title: res.data.title,
                    bContents: res.data.bContents,
                    image: res.data.image.split(','),
                    modTime: res.data.modTime,
                    likeCount: res.data.likeCount,
                    replyCount: res.data.replyCount,
                    uid: res.data.uid,
                    bid: res.data.bid,
                    liked: res.data.liked,
                    profile: res.data.profile,
                }
                setBoard(formData);
            }).catch(error => console.log(error));
        }
    }, [url])

    return board;
}