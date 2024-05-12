import axios from "axios"

export const userUpdate = async (sendData: string) => {

    return axios({
        method: "POST",
        url: 'http://localhost:8090/user/update',
        data: sendData,
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log("axiospost.js: userUpdate error!");
        console.log(error);
    });
}

export const insertBoard = async (sendData: string) => {

    return axios({
        method: "POST",
        url: 'http://localhost:8090/board/insert',
        data: sendData,
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log("axiospost.js: insertBoard error!");
        console.log(error);
    });
}

export const updateBoard = async (sendData: string) => {

    return axios({
        method: "POST",
        url: 'http://localhost:8090/board/update',
        data: sendData,
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log("axiospost.js: updateBoard error!");
        console.log(error);
    });
}

export const insertReply = async (sendData: string) => {

    return axios({
        method: "POST",
        url: 'http://localhost:8090/board/reply',
        data: sendData,
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log("axiospost.js: insertReply error!");
        console.log(error);
    });
}

export const insertReReply = async (sendData: string) => {

    return axios({
        method: "POST",
        url: 'http://localhost:8090/board/Re_Reply',
        data: sendData,
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log("axiospost.js: insertReReply error!");
        console.log(error);
    });
}

export const like = async (sendData: string) => {

    return axios({
        method: "POST",
        url: 'http://localhost:8090/board/Re_Reply',
        data: sendData,
        headers: { 'Content-Type': 'application/json' }
    }).catch(error => {
        console.log("axiospost.js: like error!");
        console.log(error);
    });
}