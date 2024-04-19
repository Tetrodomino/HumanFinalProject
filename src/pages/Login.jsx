import React from "react";
import { Card } from "@mui/material";
import "../css/Darktheme.css";
import "../css/Lighttheme.css";

export default function Login() {
    return (
        <div className="background">
            <Card id='cardMain' className="cardMain">
                <div id='login-box' className="loginBox">
                    <img id="logo" src="../img/flownaryLoginLogo.png" style={{ maxWidth: '35%' }} />
                    <br />
                    <input id="id-input" placeholder="닉네임 혹은 이메일" className="commonInputStyle" />
                    <br />
                    <input id='pwd' type="password" placeholder="비밀번호" className="commonInputStyle" />
                    <br />
                    <button className="fill">로그인</button>
                    <p style={{ color: '#ffffff' }}>혹시 계정이 없으신가요?</p>
                    <button className="fill">가입하기</button>            
                </div>
            </Card>
        </div>
    );
}
