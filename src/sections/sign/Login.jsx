// 기본
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { SetWithExpiry } from "../../api/LocalStorage";  

// firebase 연결
import { login } from "../../api/firebase";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// css/componets 연결
import './theme.css'; // CSS 임포트

// alert 창
import Swal from "sweetalert2";
import axios from "axios";

export default function Login() {
    const [theme, setTheme] = useState('light'); // 초기 테마를 'light'로 설정

    // 테마를 토글하는 함수
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const auth = getAuth();

    // 테마에 따른 배경 이미지 경로 변경
    const backgroundImage = theme === 'light' ? '/img/flowLight.png' : '/img/flowNight.png';
    const logoImage = theme === 'light' ? '/img/LightLogo.png' : '/img/DarkLogo.png';
    const HelloLogo = theme === 'light' ? '/img/HelloLight.png' : '/img/HelloBlack.png';

    const [userInfo, setUserInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const handleChange = e => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    // 구글로 로그인
    const loginWithGoogle = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const data = await signInWithPopup(auth, provider);
            Swal.fire({
                icon: 'success',
                title: "구글 로그인에 성공했습니다.",
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
            console.log("구글 로그인 성공!");

            axios.get('http://localhost:8090/user/getUserEmail', {
                params: {
                    email: data.user.email
                }
            }).then(res => {
                SetWithExpiry("uid", res.data.id, 180);
                SetWithExpiry("email", res.data.email, 180);
                SetWithExpiry("profile", res.data.profile, 180);
            }).catch(error => console.log(error));


            navigate('/');
        } catch (error) {
            console.error("구글 로그인 오류:", error);
        }
    };

    
    const handleSubmit = async e => {
        e.preventDefault();
        
        try {
            // 이메일이 빈칸인 경우
            if (!userInfo.email) {
                Swal.fire({
                    icon:"warning",                    
                    text:"이메일을 입력해주세요.",
                });
                return;
            }
            
            // 비밀번호가 빈칸인 경우
            if (!userInfo.password) {
                Swal.fire({
                    icon:"warning",                    
                    text:"비밀번호를 입력해주세요.",
                });
                return;
            }
            
            // Firebase Authentication을 통해 사용자를 인증합니다.
            const checkuser = await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);

            // 사용자가 존재하는 경우
            if (checkuser) {
                login(userInfo);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "로그인에 성공하였습니다!",
                    showConfirmButton: false,
                    timer: 1200
                });
                
                axios.get('http://localhost:8090/user/getUserEmail', {
                    params: {
                        email: userInfo.email
                    }
                }).then(res => {
                    SetWithExpiry("uid", res.data.id, 180);
                    SetWithExpiry("email", res.data.email, 180);
                    SetWithExpiry("profile", res.data.profile, 180);
                }).catch(error => console.log(error));
                
                navigate('/');
            }
        } catch (error) {
            // Firebase 오류 처리를 좀 더 일반적인 메시지로 통합
            Swal.fire({
                icon: "error",
                title: "앗! 잠시만요",
                text: "이메일 혹은 비밀번호가 맞지 않아요.",
                footer: '<a href="register">혹시 계정이 없으신가요?</a>'
            });
            console.error(error);
        }
    }
    
    return (
        <div className={`background ${theme}`} style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Card id='cardMain' className="cardMain">
                <div id='login-box' className="loginBox">
                    <div className={`welcome-message`}>
                        <img src={HelloLogo} alt='Hello' style={{ maxWidth: '10%' }} />
                    </div>
                    <img src={logoImage} alt='LOGO' style={{ maxWidth: '20%' }} />

                    <br />
                    <input type="email" name='email' placeholder="닉네임 혹은 이메일" className="commonInputStyle"
                        onChange={handleChange} />
                    <br />
                    <input type="password" name='password' placeholder="비밀번호" className="commonInputStyle"
                        onChange={handleChange} />
                    <br />
                    <button className="fill" onClick={handleSubmit}>로그인</button>
                    <p style={{
                        marginTop: '3px', marginBottom: '10px',
                        color: theme === 'light' ? '#dca3e7' : '#ffffff'
                    }}>또는</p>
                    <Link to="#" onClick={loginWithGoogle} className={`custom-button ${theme}`}>
                        <img style={{ paddingRight: '5px', margin: '-5px', width: '1.55em' }} src="/img/icon/Google.png" alt="Google" />
                        <span>       로그인</span>
                    </Link>
                    <br /><br />
                    <p style={{ color: theme === 'light' ? '#dca3e7' : '#ffffff' }}>혹시 계정이 없으신가요?</p>
                    <div>
                        <Link to="/register" className={`custom-button ${theme}`}>가입하기</Link>
                    </div>
                    <br />
                    <div className="container">
                        <hr />
                        <button onClick={toggleTheme} className="fill">테마변경</button>
                    </div>
                </div>
            </Card>
        </div>
    );
}