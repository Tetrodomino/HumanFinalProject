import axios from "axios"
import { UploadImage } from "./image";

export const userRegister = async (hashuid: string, provider: number, email: string, pwd: string) => {

    return axios.get('http://localhost:8090/user/register', {
        params: {
            hashuid: hashuid,
            provider: provider,
            email: email,
            pwd: pwd,
        }
    }).catch(error => {
        console.log('axiosget.js: userRegister error!');
        console.log(error);
    });
}

export const userUpdatePwd = async (uid: number, pwd1: string, pwd2: string) => {

    const result = await axios.get('http://localhost:8090/user/updatepwd', {
        params: {
            uid: uid,
            pwd1: pwd1,
            pwd2: pwd2,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: userUpdatePwd error!');
        console.log(error);
    });

    return result;
}

export const getUser = async (uid: number) => {

    const result = await axios.get('http://localhost:8090/user/getUser', {
        params: {
            uid: uid,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getUser error!');
        console.log(error);
    });

    return result;
}

export const getUserEmail = async (email: string) => {

    const result = await axios.get('http://localhost:8090/user/getUserByEmail', {
        params: {
            email: email,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getUserEmail error!');
        console.log(error);
    });

    return result;
}

// uid는 넣지 않아도 가능
export const getBoard = async (bid: Number, uid = -1) => {
    
    const result = await axios.get('http://localhost:8090/board/getBoard', {
        params: {
            bid: bid,
            uid: uid,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getBoard error!');
        console.log(error);
    });

    return result;
}

export const getBoardUrl = async (url: string, uid = -1) => {

    const result = await axios.get('http://localhost:8090/board/getBoardUrl', {
        params: {
            url: url,
            uid: uid,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getBoardUrl error!');
        console.log(error);
    });

    return result;
}

export const getBoardList = async (count = 1, field='title', field2 = '', field3 = '', query = '', type = 1, uid = -1) => {

    const result = await axios.get('http://localhost:8090/board/list', {
        params: {
            c: count,
            f: field,
            f2: field2,
            f3: field3,
            q: query,
            type: type,
            uid: uid,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getBoardList error!');
        console.log(error);
    });

    return result;
}

export const getReplyList = async (bid: Number, offset: Number, limit: number) => {
    
    const result = await axios.get('http://localhost:8090/board/replyList', {
        params: {
            bid: bid,
            offset: offset,
            limit: limit,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getReplyList error!');
        console.log(error);
    });

    return result;
}

export const getReReplyList = async (rid: number) => {

    const result = await axios.get('http://localhost:8090/board/re_ReplyList', {
        params: {
            rid: rid,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getReplyList error!');
        console.log(error);
    });

    return result;
}

export const deleteBoard = async (bid: number) => {

    return axios.get('http://localhost:8090/board/re_ReplyList', {
        params: {
            bid: bid,
        }
    }).then((response) => response.data)
    .catch(error => {
        console.log('axiosget.js: getReplyList error!');
        console.log(error);
    });
}