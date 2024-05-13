import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, ListItem, ListItemAvatar, Modal, Paper, Stack, Typography } from "@mui/material";
import React, { forwardRef, useState } from "react";

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

const BoardDetail = forwardRef(({ handleClose, bid, uid, nickname, handleButtonLike }, ref) => {
  const board = useQuery({
    queryKey: ['board', bid, uid],
    queryFn: () => getBoard(bid, uid),
  });

  if (board.isLoading) {
    return <div>로딩 중...</div>;
  }

  const image = board.data.image != null ? board.data.image.split(',') : null;

  return (
    <Box className="board_modal">
      <Stack direction="row" justifyContent="space-between" sx={{ height: '100%' }}>
        <Stack direction="column" sx={{ flex: 1.3, height: '100%' }}>
          {/* 게시글 내용 */}
          <Card sx={{ height: '100vh', padding: 3 }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${board.data.profile}`}
                />
              }
              title={board.data.title}
              subheader={board.data.modTime}
            />
            <Carousel>
              {image &&
                image.map((image, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    sx={{
                      width: '100%',
                      '@media (min-width: 500px)': {
                        maxHeight: '100px',
                        objectFit: 'contain',
                      },
                      '@media (min-width: 768px)': {
                        maxHeight: '100px',
                        objectFit: 'contain',
                      },
                      '@media (min-width: 1024px)': {
                        maxHeight: '250px',
                        objectFit: 'contain',
                      },
                    }}
                    image={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${image}`}
                    alt={`Image ${index + 1}`}
                  />
                ))}
            </Carousel>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '62%', overflowY: 'auto' }}>
              <Stack direction="row" spacing={1} padding={'10px 0 25px 0'}>
                <Button sx={{ padding: 0, width: 0 }} onClick={() => handleButtonLike(board.data.bid, board.data.uid)}>
                  <FavoriteIcon sx={board.data.liked ? { color: 'red' } : { color: 'blue' }} />
                  {board.data.likeCount}
                </Button>
                <Button sx={{ padding: 0, width: 0 }}>
                  <ShareIcon />
                </Button>
                <Button sx={{ padding: 0, width: 0 }}>
                  <BookmarkIcon />
                </Button>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography component={'div'} variant="body2" color="text.secondary">
                  {board.data.bContents}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        {/* Reply 컴포넌트 추가 */}
        <Reply bid={bid} uid={uid} nickname={nickname} />

        {/* 닫기 버튼 */}
        <div className="board_div_style_2">
          <ClearIcon
            onClick={() => handleClose()}
            sx={{ cursor: 'pointer', fontSize: '26px', backgroundColor: 'rgb(162, 152, 182)', borderRadius: '100%', margin: '3px' }}
          />
        </div>
      </Stack>
    </Box>
  );
});

export default BoardDetail;