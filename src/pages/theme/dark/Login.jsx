import { Card } from "@mui/material";
import React from "react";
import '../../../css/login,register.css';

export default function Login() {
    return (
        // 배경
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'url(/img/flowNight.png)', // 이미지 경로 지정
            backgroundSize: 'cover', // 이미지를 커버하도록 설정
            backgroundPosition: 'center', // 이미지를 가운데 정렬
        }}>

            <Card id='cardMain'
                style={{
                    textAlign: 'center',
                    maxWidth: '80%',
                    padding: '10%',
                    boxSizing: 'border-box',  // 패딩 포함하여 너비 계산
                    height: 'auto',  // 높이를 내용에 맞춰 자동 조절
                    borderRadius: '10px',
                    border: '2.5px solid rgba(255, 255, 255, 0.4)',  // 흰색 실선 테두리
                    background: 'transparent',  // 투명 배경
                    backdropFilter: 'blur(15px)'  // 배경 블러 효과             
                }}
            >

                <div id='login-box' style={{ padding: '35px', }}>

                    {/* 로고 */}
                    <img src="../img/flownaryLoginLogo.png"
                        style={{ maxWidth: '35%', }}/>
                    <br />

                    <input id="id-input" placeholder="닉네임 혹은 이메일"
                        className="commonInputStyle">
                    </input>
                    <br />

                    <input id='pwd' type="password" placeholder="비밀번호"
                        className="commonInputStyle">
                    </input>                    
                    <br />

                    <button className="fill2">로그인</button>
                    <p style={{ color: '#ffffff' }}>혹시 계정이 없으신가요?</p>
                    <button className="fill2">가입하기</button>
                </div>
                <br />
            </Card>
        </div>
    )
}