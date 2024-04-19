import React from "react";
import { Card } from "@mui/material";
import '../css/Lighttheme.css';
// import '../../../CSS/Darktheme.css';

export default function Register() {
    return (
        <div className="background">
            <Card id='cardMain' className="cardMain">
                <div id='login-box' className="loginBox">
                    <img src="../img/flownaryLoginLogo.png" style={{ maxWidth: '30%' }}/>
                    <br />
                    <input placeholder="닉네임 혹은 이메일" className="commonInputStyle" />
                    <br />
                    <input type="password" placeholder="비밀번호" className="commonInputStyle" />
                    <br />
                    <input type="password" placeholder="비밀번호 확인" className="commonInputStyle" />
                    <br />
                    <button className="fill">가입확인</button>
                    <hr style={{ border: '2px solid rgba(255, 255, 255, 0.4)' }} />
                    <p style={{ color: '#ffffff' }}>또는</p>
                    <button className="fill">GOOGLE <br />로그인</button>
                    <button className="fill">FlowNary <br />로그인</button>
                </div>
            </Card>
        </div>
    );
}