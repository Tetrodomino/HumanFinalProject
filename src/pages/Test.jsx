import React, { useState } from "react";
import axios from "axios";

export default function Test() {
    const [n, setN] = useState();

    const buClick = () => {
        console.log(n);
        axios.get('/board/insert', {
            params: {
                n: n,
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
        <input onChange={(e) => {
            setN(e.target.value);
        }}></input>
        <button onClick={buClick}>전송</button>
        </>
    );
}