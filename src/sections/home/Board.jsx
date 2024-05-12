// 기본
import React, { useEffect, useMemo, useState } from 'react'
import {
  Card, CardHeader, CardMedia, CardActions, CardContent, Avatar, Typography,
  ListItemAvatar, ListItem, List, Button, Box, Modal, Paper
} from '@mui/material';
import { red } from '@mui/material/colors';
import { Stack } from '@mui/system';

// 이모티콘
import InputEmoji from 'react-input-emoji'

// 아이콘
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { GetWithExpiry, SetWithExpiry } from "../../api/LocalStorage.js";
import axios from 'axios';

// css 연결
import './board.css';

import Carousel from 'react-material-ui-carousel'
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserNicknameLS } from '../../api/customHook.jsx';
import { useGetBoard, useGetBoardByUrl, useGetBoardList, useGetReplyList } from './BoardJS.js';
import { useQuery } from '@tanstack/react-query';
import { getBoard, getBoardList, getBoardUrl, getReplyList } from '../../api/axiosGet.js';
import BoardDetail from './BoardDetail.jsx';
import BoardUrl from './BoardUrl.jsx';

export default function Board() {
  const navigate = useNavigate();

  const uid = GetWithExpiry("uid");
  const email = GetWithExpiry("email");
  const profile = GetWithExpiry("profile");

  const [bid, setBid] = useState(0);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  if (uid == -1) {
    navigate("/login");
  }
  const nickname = useGetUserNicknameLS();

  // 창 열고 닫기
  const handleOpen = (bid) => {
    setOpen(true);
    setBid(bid);
  }
  const handleClose = () => {
    setOpen(false);
    setBid(-1);
  };

  const location = useLocation();

  const path2 = useMemo(() => {
      const path = location.pathname.split('/');
      return path[path.length - 1];
  }, [])

  const dataList = useQuery({
    queryKey: ['boardList', uid],
    queryFn: () => getBoardList(10, uid),
  });

  // const ReReplyFormSubmit = (e) => {
  //   e.preventDefault();
  //   var sendData = JSON.stringify({
  //     rid: replyList.rid,
  //     uid: uid,
  //     rrContents: text,
  //     nickname: nickname,
  //   })

  //   axios({
  //     method: "POST",
  //     url: 'http://localhost:8090/board/re_Reply',
  //     data: sendData,
  //     headers: { 'Content-Type': 'application/json' }
  //   }).catch(error => console.log(error));

  //   setText('');
  // }

  function handleButtonLike(bid, uid2) {
    var sendData = JSON.stringify({
      uid: uid,
      fuid: uid2,
      oid: bid,
    })

    axios({
      method: "POST",
      url: 'http://localhost:8090/board/like',
      data: sendData,
      headers: { 'Content-Type': 'application/json' }
    })
      .catch(error => console.log(error));
  }

  if (dataList.isLoading) {
    return (<div>로딩 중...</div>)
  }
  
  return (
    <>
      {/* {path2 && <BoardUrl path={path2} uid={uid} nickname={nickname} />} */}

      {/* boardList */}
      {dataList.data && dataList.data.map((data) => (
        <Card key={data.bid} sx={{ width: "70%", marginTop: '30px', border: '1px solid lightgrey' }}>
          {/* Home 부분에서 게시글이 보이는 모습 */}
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.profile}`}
              </Avatar>
            }
            title={data.title}
            subheader={data.modTime}
          />
          <CardMedia component="img" height="194" image={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.image[0]}`} alt="Paella dish" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {data.bContents}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* 게시글 하단 버튼 - 좋아요 / 게시글 */}
            <Button onClick={() => handleButtonLike(data.bid, data.uid)}>
              <FavoriteIcon sx={data.liked ? {color: 'red'} : {color: 'blue'}} />{data.likeCount}
            </Button>
            <Button onClick={() => handleOpen(data.bid)}>
              <ChatBubbleOutlineIcon />{data.replyCount}
            </Button>
            <Button >
              <ShareIcon />
            </Button>
            <Button>
              <BookmarkIcon />
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* 게시글 모달 */}
      <BoardDetail open={open} bid={bid} uid={uid} nickname={nickname} />
    </>
  );

}