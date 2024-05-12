import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, ListItem, ListItemAvatar, Modal, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

// 이모티콘
import InputEmoji from 'react-input-emoji'

// 아이콘
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Reply from "./Reply";
import { getBoard } from "../../api/axiosGet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import { red } from '@mui/material/colors';

export default function BoardDetail(props) {
  const bid = props.bid;
  const uid = props.uid;
  const [open, setOpen] = useState(props.open);

  const board = useQuery({
    queryKey: ['board', bid, uid],
    queryFn: () => getBoard(bid, uid),
  });

  if (board.isLoading)  {
      return (
        <div>로딩 중...</div>
      )
  }

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

  const handleOpen = (bid) => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">

    <Box className='board_modal'>
      <Stack direction="row" justifyContent="space-between" sx={{ height: "100%" }}>
        <Stack direction="column" sx={{ flex: 1.3, height: "100%", }} >
          {/* 게시글 내용 */}
          <Card sx={{ height: "100vh", padding: 3 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"
                  src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${board.data.profile}`}
                />
              }
              title={board.data.title}
              subheader={board.data.modTime}
            />
            <Carousel>
              {board.data.image && board.data.image.map((image, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  sx={{
                    width: '100%',
                    '@media (min-width: 500px)': { // 화면이 768px 이상인 경우
                      maxHeight: '100px',
                      objectFit: 'contain', // 이미지 높이를 300px로 고정
                    },
                    '@media (min-width: 768px)': { // 화면이 768px 이상인 경우
                      maxHeight: '100px',
                      objectFit: 'contain', // 이미지 높이를 300px로 고정
                    },
                    '@media (min-width: 1024px)': { // 화면이 1024px 이상인 경우
                      maxHeight: '250px',
                      objectFit: 'contain', // 이미지 높이를 400px로 고정
                    },

                    // 필요한 만큼 다른 미디어 쿼리를 추가할 수 있습니다.
                  }}

                  image={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${image}`}
                  alt={`Image ${index + 1}`}
                />
              ))}
            </Carousel>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '62%', overflowY: 'auto' }}>
              <Stack direction="row" spacing={1} padding={'10px 0 25px 0'}>
                <Button sx={{ padding: 0, width: 0 }} onClick={() => handleButtonLike(board.data.bid, board.data.uid)}>
                  <FavoriteIcon sx={board.data.liked ? {color: 'red'} : {color: 'blue'}} />{board.data.likeCount}
                </Button>
                <Button sx={{ padding: 0, width: 0 }}>
                  <ShareIcon />
                </Button>
                <Button sx={{ padding: 0, width: 0 }}>
                  <BookmarkIcon />
                </Button>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="text.secondary" >
                  {board.data.bContents}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Reply bid={bid} uid={uid} nickname={props.nickname} />

        {/* 닫기 버튼 */}
        <div className='board_div_style_2'>
          <ClearIcon onClick={handleClose} sx={{ cursor: 'pointer', fontSize: '26px', backgroundColor: 'rgb(162, 152, 182)', borderRadius: '100%', margin: '3px' }} />
        </div>
      </Stack>
    </Box>
    </Modal >
    </>
  );
}