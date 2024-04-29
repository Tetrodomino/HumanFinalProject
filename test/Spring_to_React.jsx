import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function Spring_to_React() {
    const [message, setMessage] = useState("");
    const [datas, setDatas] = useState({});
    const [dataList, setDataList] = useState([{id: 1, name: 'name1'}]); // 미리 형태를 맞춰놓기

    console.log(dataList)

    ///////////////// Spring에서 Text 받아오기 /////////////////
    useEffect(() => {
        fetch('/text') // http://localhost:8090/text 에 접속하여 데이터를 받아오는 것
            .then(response => response.text())
            .then(message => {
                setMessage(message);
            })
    }, [])


    ///////////////// Spring에서 객체(Object) 받아오기 /////////////////
    useEffect(() => {
        axios.get('/text2') // http://localhost:8090/text2 에 접속하여 데이터 받기
            .then(res => {
                setDatas(res.data); // 전달된 데이터를 datas에 넣기
            })
            .catch(err => {
                console.log(err);
            });
    }, [])


    ///////////////// Spring에서 배열(JSONArray) 받아오기 /////////////////
    useEffect(() => {
        axios.get('/text3') // http://localhost:8090/text3 에 접속하여 데이터 받기
            .then(res => {
                setDataList(res.data); // 전달된 데이터를 datas에 넣기
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
        
    console.log(dataList);

    return (
        <>
            <div>{message}</div> {/* Text */}
            <br /><br />
            
            <div>{datas.id}, {datas.name}</div> {/* 객체 */}
            <br /><br />
            
            <div> {/* 배열 */} 112
                {dataList.map((data, idx) => {
                    return <div key={idx}>{data.id}, {data.name}</div> // 중괄호면 return 이 있어야 작동함
                })}
            </div>
        </>
    );
}
