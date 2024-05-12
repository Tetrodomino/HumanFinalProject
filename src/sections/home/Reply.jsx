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

export default function Reply(props) {
  const bid = props.bid;
  const nickname = props.nickname;
  const [text, setText] = useState('');
  const uid = props.uid;
  const [expandedContents, setExpandedContents] = useState({});

  const replyList = useQuery({
    queryKey: ['board', bid],
    queryFn: () => getReplyList(bid, 0, 20),
  });

  if (replyList.isLoading)  {
      return (
        <div>로딩 중...</div>
      )
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    var sendData = JSON.stringify({
      bid: bid,
      uid: uid,
      rContents: text,
      nickname: nickname,
    })

    axios({
      method: "POST",
      url: 'http://localhost:8090/board/reply',
      data: sendData,
      headers: { 'Content-Type': 'application/json' }
    }).catch(error => console.log(error));

    setText('');
  };

  const handleOnEnter = (text) => {
    console.log('enter', text);
  }

  const toggleExpand = (index) => {
    setExpandedContents((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  
  return (
    <>
      {/* 댓글 내용 List */}
      <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Stack direction="column" sx={{ flex: '1.4', padding: 1, overflowY: 'auto' }}>
          <Stack direction="column" alignItems="center" sx={{ width: "100%", overflowX: 'hidden' }}>
            {replyList.data.map((data, index) => (
              <List key={index} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', paddingRight: 3 }}>
                <Paper>
                <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemAvatar>
                    <Avatar
                      src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.profile}`}
                    />
                  </ListItemAvatar>
                  <Typography>
                    {data.nickname}
                  </Typography>
                </ListItem>
                <Typography variant="body2" color="text.secondary" sx={{ padding: 2, overflowWrap: 'break-word', }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        {data.rContents != null && (expandedContents[index] ? data.rContents : data.rContents.slice(0, 28))}
                        {data.rContents != null && data.rContents.length > 30 && !expandedContents[index] && (
                          <button className='replyOpen' onClick={() => toggleExpand(index)}>...더보기</button>
                        )}
                        {expandedContents[index] && (
                          <button className='replyClose' onClick={() => toggleExpand(index)}>접기</button>
                        )}
                      </div>
                      <div>
                        <Button sx={{ color: 'grey' }}><FavoriteBorderIcon /></Button>
                      </div>
                    </div>
                    <br />
                    {/* <ReReplyList params={data.rid}/> */}
                    <Button sx={{ color: 'grey' }}>좋아요 0개</Button>
                    <Button sx={{ color: 'grey' }}>답글 달기</Button>
                </Typography>
                </Paper>
              </List>
            ))}
          </Stack>
        </Stack>

        <Box className='board_div_style_1' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ margin: 1 }} />
            <Typography>{nickname}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <InputEmoji
              value={text}
              onChange={setText}
              onEnter={handleOnEnter}
              placeholder="입력.."
              shouldReturn
              fontSize={15}
              language='kr'
              sx={{ flex: 1 }} // InputEmoji의 크기를 조절
            />
            <Button onClick={handleFormSubmit}>게시</Button>
          </Box>
        </Box>
      </Box>
    </>
  );

}