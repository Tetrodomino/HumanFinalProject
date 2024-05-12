// 기본
import React, { useEffect, useRef, useState } from 'react';
import { Box, Modal, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Badge, Grid } from '@mui/material';

// 아이콘
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

// css 연결
import './notice.css';
import { GetWithExpiry } from '../../api/LocalStorage';
import axios from 'axios';

export default function NoticeModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (uid != null && !isNaN(uid))
    {
      publish();
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false)
    setNotice([]);
  };

  const client = useRef({});
  const [notice, setNotice] = useState([]);

  const uid = GetWithExpiry("uid");

  useEffect(() => {
    if (uid != null && !isNaN(uid))
    {
      connect();

      axios.get('http://localhost:8090/notice/list', {
        params: {
          uid: uid,
        }
      }).then(res => {
        setNotice(res.data);
      }).catch(error => console.log(error));
    
      return () => disconnect();
    }
  }, [])

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("/ws-stomp"), // proxy를 통한 접속
      connectHeaders: {
        "auth-token": "spring-chat-auth-token",
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`/sub/notice/${uid}`, ({ body }) => {
      setNotice(JSON.parse(body));
      console.log(body);
    });
  };

  const publish = () => {
    if (!client.current.connected) {
      return;
    }

    // client.current.publish({
    //   destination: "/pub/notice",
    //   body: uid,
    //   //body: JSON.stringify({ uid: uid }),
    // });
  };

  return (
    <div>
      {/* Aside에 표시될 알림부분 표현 */}
      <button onClick={handleOpen} className='asideStyle'>
        <Grid container>
          <Grid item xs={12} lg={6} sx={{ display: { xs: 'flex', lg: 'flex' }, pl: 3 }}>
            {/* Bedge로 알림 수 표현 */}
            <Badge badgeContent={4} color="warning" sx={{ mr: 2.3 }}>
              <NotificationsNoneIcon className='iconStyle' sx={{ mr: '4px' }} />
            </Badge>
          </Grid>
          <Grid item xs={0} lg={6} sx={{ color:'rgb(58, 0, 85)', display: { xs: 'none', lg: 'flex' }, pr: 3, justifyContent: 'flex-end' }}>
            알림
          </Grid>
        </Grid>
      </button>

      {/* 알림 부분 Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box className='styleBox'>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ margin: 3 }}>
            알림 목록
            <Badge badgeContent={4} color="primary" sx={{ marginLeft: 5, marginRight: 10 }}>
              <NotificationsActiveIcon color="action" sx={{ marginRight: '8px' }} />
            </Badge>
          </Typography>
          <hr />
          
          <Typography sx={{marginLeft: '20px'}}>
            게시물 알림
          </Typography>
          <List sx={{ width: '100%', Width: 500 }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary='팔로잉한 사람이 새로운 게시글을 작성했습니다.'
                secondary={
                  <React.Fragment>
                    <Typography sx={{ display: 'inline', marginRight: 5 }} component="span"
                      variant="body2" color="text.primary">
                      게시글 이름
                    </Typography>
                    {'댓글 내용'}
                  </React.Fragment>}
              />
            </ListItem>
          </List>
          <Divider variant="inset" component="li" />
          <Typography sx={{marginLeft: '20px'}}>
            댓글 알림
          </Typography>
          <List sx={{ width: '100%', Width: 500 }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary='내 게시글에 새로운 댓글이 작성되었습니다.'
                secondary={
                  <React.Fragment>
                    <Typography sx={{ display: 'inline', marginRight: 5 }} component="span"
                      variant="body2" color="text.primary">
                      게시글 이름
                    </Typography>
                    {'댓글 내용'}
                  </React.Fragment>}
              />
            </ListItem>
          </List>
          <Divider variant="inset" component="li" />
          <Typography sx={{marginLeft: '20px'}}>
            팔로우 알림
          </Typography>
          <List sx={{ width: '100%', Width: 500 }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary='~가 당신을 팔로우 하고 싶어합니다.'
                secondary={
                  <React.Fragment>
                    <Typography sx={{ display: 'inline', marginRight: 5 }} component="span"
                      variant="body2" color="text.primary">
                      ~~의 마이페이지
                    </Typography>
                  </React.Fragment>}
              />
              </ListItem>
            </List>
            <Divider variant="inset" component="li" />
            <Typography sx={{marginLeft: '20px'}}>
              좋아요 알림
            </Typography>
            <List sx={{ width: '100%', Width: 500 }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary='내 게시글에 ~~이 좋아요를 눌렀습니다.'
                  secondary={
                    <React.Fragment>
                      <Typography sx={{ display: 'inline', marginRight: 5 }} component="span"
                        variant="body2" color="text.primary">
                        ~~의 마이페이지
                      </Typography>
                    </React.Fragment>}
                />
                </ListItem>
            </List>
            <Divider variant="inset" component="li" />
            <Typography sx={{marginLeft: '20px'}}>
              DM 알림
            </Typography>
            <List sx={{ width: '100%', Width: 500 }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary='내 게시글에 ~~이 좋아요를 눌렀습니다.'
                  secondary={
                    <React.Fragment>
                      <Typography sx={{ display: 'inline', marginRight: 5 }} component="span"
                        variant="body2" color="text.primary">
                        게시글 이름
                      </Typography>
                    </React.Fragment>}
                />
              </ListItem>
            </List>
        </Box>
      </Modal>
    </div>
  );
}