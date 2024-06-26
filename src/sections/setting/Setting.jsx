// 기본
import React, { useEffect, useState } from "react";
import { Box, Button, Card, TextField, Typography, InputLabel, MenuItem, FormControl, Select, Avatar, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

// css 연결
import './setting.css';
import axios from "axios";

// alert 창
import Swal from "sweetalert2";

// components 연결
import SettingBirth from "./SettingBirth.jsx";
import SettingTel from "./SettingTel.jsx";
import SettingNickname from "./SettingNickname.jsx";
import { GetWithExpiry, SetWithExpiry } from "../../api/LocalStorage.js";
import { FindImage, UploadImage } from "../../api/image.js";
import { useQuery } from "@tanstack/react-query";
import { useUpdateUser } from "../../api/customHook.jsx";

export default function SettingDetail() {
  const navigate = useNavigate();

  // localStorage를 이용해서 user 받아오기
  const uid = GetWithExpiry("uid");
  const email = GetWithExpiry("email");

  // user 정보 초기화, 비밀번호 확인
  // eslint-disable-next-line
  const [uname, setUname] = useState('');
  const [nickname, setNickname] = useState('');
  const [statusMessage, setStat] = useState('');
  const [image, setImage] = useState('');
  const [snsDomain, setSnsDomain] = useState('');
  const [status, setStatus] = useState('0');
  const [birth, setBirth] = useState('');
  const [tel, setTel] = useState('');
  const [gender, setGender] = useState('');

  // 이미지 업로드
  // eslint-disable-next-line
  const [profile, setProfile] = useState('');
  // eslint-disable-next-line
  const [preview, setPreview] = useState('');
  // eslint-disable-next-line
  const [change, setChange] = useState(0);
  // eslint-disable-next-line
  const [myimage, setMyimage] = useState('');

  // 설정 변경 조건 확인
  const [checkingNickname, setCheckingNickname] = useState(1);
  const [checkingTel, setCheckingTel] = useState(1);

  // 로그인 여부 확인
  useEffect(() => { if (uid == -1) { navigate('/login'); } }, [uid, navigate]);

  const { isLoading } = useQuery({
    queryKey: ['user', uid],
    queryFn: async () => {
      const result = await axios.get('http://localhost:8090/user/getUser', {
        params: {
          uid: uid,
        }
      }).then(res => {
        if (res.data.profile != null) {
          setProfile(res.data.profile);
          setMyimage(FindImage(res.data.profile));
        }
        setUname(res.data.uname); setNickname(res.data.nickname);
        setStat(res.data.statusMessage); setTel(res.data.tel);
        setBirth(res.data.birth); setSnsDomain(res.data.snsDomain);
      }).catch(error => console.log(error));

      return result;
    }
  });

  // 설정창에서 값이 바뀔 때마다 저장하는 함수
  const handleUname = (e) => { setUname(e.target.value); };
  const handleNickname = (e) => { setNickname(e.target.value); };
  const handleStat = (e) => { setStat(e.target.value); };
  const handleGender = (event) => { setGender(event.target.value === 'man' ? 0 : (event.target.value === 'woman' ? 1 : 2)); };
  const handleSnsDomain = (e) => { setSnsDomain(e.target.value); };
  const handleTel = (e) => { setTel(e) };
  const handleBirthChange = (e) => { setBirth(e.target.value) }

  const handleCheckingTel = (e) => { setCheckingTel(e) };
  const handleCheckingNickname = (e) => { setCheckingNickname(e) };

  const updateUser = useUpdateUser();
  const updateUserForm = (sendData) => {
    updateUser(sendData);
  }

  // 제출
  const submitProfile = async () => {
    if (checkingNickname === 0) {
      Swal.fire({
        title: "닉네임 중복 확인을 해주세요",
        icon: "warning"
      });
      return;
    }

    if (checkingTel === 0) {
      Swal.fire({
        title: "전화번호 중복 확인을 해주세요",
        icon: "warning"
      });
      return;
    }

    if (change !== 1) {
      const sendData = {
        uname: uname,
        nickname: nickname,
        profile: profile,
        statusMessage: statusMessage,
        snsDomain: snsDomain,
        uid: uid,
        gender: gender,
        birth: birth,
        tel: tel,
      };
      updateUserForm(sendData);

    } else {
      const url = await UploadImage(image); // 이 줄이 비동기 작업을 기다리고 URL을 반환합니다.
      if (url) { // URL이 성공적으로 반환되었는지 확인
        setProfile(url.public_id);
        const sendData = {
          uname: uname,
          nickname: nickname,
          profile: url.public_id,
          statusMessage: statusMessage,
          snsDomain: snsDomain,
          uid: uid,
          gender: gender,
          birth: birth,
          tel: tel,
        };
        updateUserForm(sendData);
        // await axios.post('http://localhost:8090/user/update', {
        //   uname: uname,
        //   nickname: nickname,
        //   profile: url.public_id,
        //   statusMessage: statusMessage,
        //   snsDomain: snsDomain,
        //   uid: uid,
        //   gender: gender,
        //   birth: birth,
        //   tel: tel,
        // }).catch(error => console.log(error));
      } else {
        console.log("이미지 업로드 실패: URL이 없습니다.");
      }
    }

    SetWithExpiry("uid", uid, 180);
    SetWithExpiry("emaill", email, 180);
    SetWithExpiry("profile", profile, 180);
    
    Swal.fire({
      icon: 'success',
      title: "설정 변경에 성공했습니다.",
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
    navigate(-1);
  }


  const goBack = () => { navigate('/'); }

  const deactiveAccount = () => { setStatus(status === 0 ? 1 : 0) }

  const handleImageEdit = () => {
    // "사진수정" 버튼 클릭 시 input[type='file'] 트리거
    document.getElementById('hidden-input').click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (event.target.files.length === 0) {
      return;
    }
    else {
      setImage(file);
      setChange(1);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  };

  if (isLoading) {
    return (<div>로딩 중...</div>)
  }

  return (
    <>
      <Box sx={{
        display: 'flex', justifyContent: 'center',
        width: '80%',
        border: '0px solid rgb(92, 22, 153)'
      }}>
        <Card sx={{
          mt: 5,
          boxShadow: 'none', width: '70%',
        }}>
          <Typography variant="h6"
            sx={{
              mt: 2, mb: 2,
              fontWeight: 'bold',
              color: 'rgb(92, 22, 153)',
              margin: '0px 0px 0px 15px',
            }}>프로필 편집</Typography>

          <Box sx={{ m: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* 프로필 사진, 닉네임, 편집 버튼 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#4b008225',
                borderRadius: '15px',
                padding: '0.75em 0.25em',
              }}>

              <Avatar
                alt="이미지를 추가하세요"
                src={preview || `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${profile}`}
                sx={{
                  width: 80, height: 80, ml: 3, mr: 2, cursor: 'pointer'
                }}
                onClick={handleImageEdit}

              />
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                hidden
                id="hidden-input"
              />

              <Typography variant="h6"
                sx={{
                  flexGrow: 1, fontWeight: 'bold',
                  display: {
                    xs: 'none',
                    md: 'none',
                    lg: 'flex'
                  },
                }}>{nickname}</Typography>
              <Button
                variant='contained'
                onClick={handleImageEdit}
                style={{
                  marginRight: '2.5em',
                  backgroundColor: 'rgb(54, 11, 92)',

                }}>사진수정</Button>
            </Box>
            <br />

            {/* 프로필 편집 폼 */}
            <TextField
              fullWidth
              label="이메일"
              variant="outlined"
              value={email || ''}
              disabled
              sx={{ mt: 2, width: '100%' }}
            />
            <br />
            {/* 소개 영역 */}
            <TextField
              fullWidth
              label="상태 메시지를 수정하세요"
              variant="outlined"
              value={statusMessage || ''}
              onChange={handleStat}
              sx={{ width: '100%' }}
            />

            {/* 성별 선택 영역 */}
            <Box sx={{ alignSelf: 'flex-start', mt: 2, mb: 2, width: '100%' }}>
              <FormControl fullWidth>
                <InputLabel>성별</InputLabel>
                <Select
                  value={gender === 0 ? 'man' : (gender === 1 ? 'woman' : 'none')}
                  label="성별"
                  onChange={handleGender}
                >
                  <MenuItem value={"man"}>남자</MenuItem>
                  <MenuItem value={"woman"}>여자</MenuItem>
                  <MenuItem value={"none"}>설정 안함</MenuItem>
                </Select>
              </FormControl>
              <br /><br />

              {/* 생일 변경 */}
              <SettingBirth birth={birth} onBirthChange={handleBirthChange} />

            </Box>

            {/* 이름 입력 */}
            <TextField
              required
              fullWidth
              label="이름"
              variant="standard"
              value={uname || ''}
              onChange={handleUname}
              sx={{ mt: 2, width: '100%' }}
            />

            {/* 닉네임 입력 */}
            <SettingNickname nickname={nickname} email={email} checkingNickname={checkingNickname} onNicknameChange={handleNickname} changeCheckingNickname={handleCheckingNickname} />


            {/* 도메인 입력 */}
            <TextField
              fullWidth
              label="도메인 주소"
              variant="standard"
              value={snsDomain || ''}
              onChange={handleSnsDomain}
              sx={{ mt: 2, width: '100%' }}
            />

            {/* 전화번호 입력 */}
            <SettingTel tel={tel} email={email} checkingTel={checkingTel} onTelChange={handleTel} changeChenckingTel={handleCheckingTel} />

            {/* 하단 버튼 영역 */}
            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Grid item xs={8} lg={6} sx={{ display: 'flex' }}>
                <Button
                  variant="contained"
                  onClick={submitProfile}
                  style={{ margin: '1em', width: '20%', backgroundColor: 'rgb(54, 11, 92)' }}>
                  완료
                </Button>

                <Button
                  variant="contained"
                  onClick={goBack}
                  style={{ margin: '1em', width: '20%', backgroundColor: '#bbbbbb' }}>
                  취소
                </Button>
              </Grid>

              {status === 0 ?
                <Grid item xs={4} lg={6} >
                  <Button
                    variant="contained"
                    onClick={deactiveAccount}
                    style={{ margin: '1em', width: '15%', backgroundColor: 'red' }}>
                    계정<br />잠그기
                  </Button>
                </Grid>
                :
                <Grid item xs={4} lg={6} >
                  <Button
                    variant="contained"
                    onClick={deactiveAccount}
                    style={{ margin: '1em', width: '15%', backgroundColor: 'Blue' }}>
                    활성화
                  </Button>
                </Grid>}
            </Grid>

          </Box>

        </Card >
      </Box >
    </>
  );
}