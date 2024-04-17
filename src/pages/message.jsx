import React from "react";
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar';
import { Avatar, Button, Stack, TextField, Toolbar } from "@mui/material";
import './message.css';
import EastIcon from '@mui/icons-material/East';

export default function Message() {
  
    return (
        <div style={{position: 'absolute', height: '100%', width: '100%', minWidth: '500px', minHeight: '400px'}}>
            <Box 
            sx={{margin: '20px', border: '2px solid grey', padding: '20px', minHeight: '400px', height: '100%'}}>
                <Stack sx={{backgroundColor: "rgb(120, 120, 120)",
                height: '30px', 
                color: 'white', 
                padding: '8px',
                fontSize: '20px'}}>
                    OOO과의 대화
                </Stack>
                <Stack direction='row' justifyContent='flex-end' alignItems='flex-end'>
                    <div className="message">가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라</div>
                </Stack>
                <Stack direction='row' justifyContent='flex-start' alignItems='flex-end'>
                    <Avatar sx={{width: '50px', height: '50px'}}>R</Avatar>
                    <div className="othermessage">가나다라<br />마바사<br />아자차카</div>
                </Stack>
                <Stack direction='row' justifyContent='flex-start' alignItems='flex-end'>
                    <Avatar sx={{width: '50px', height: '50px'}}>P</Avatar>
                    <div className="othermessage">가나다라<br />마바사<br />아자차카</div>
                </Stack>
                <AppBar position="fixed" sx={{top: 'auto', bottom: 0, backgroundColor: 'rgb(192, 119, 241)'}}>
                    <Toolbar>
                        <TextField fullWidth placeholder="입력" sx={{backgroundColor: "white"}}></TextField>
                        <Button variant="contained" sx={{height: '54px', backgroundColor: 'rgb(130, 80, 200)'}}>
                            <EastIcon></EastIcon>
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}