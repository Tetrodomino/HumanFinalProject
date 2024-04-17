import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";

export default function Profile() {

    return (
        <Box sx={{width: '100%'}}>
            <Grid container sx={{padding: '20px'}}>
                <Grid item xs={0} lg={2}>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <Stack direction={'row'}>
                        <Avatar sx={{width: '230px', height: '230px', padding: '20px', margin: '20px'}}>
                            R
                        </Avatar>
                        <Stack sx={{padding: '20px'}}>
                            <Typography variant="h2">
                                O O O
                            </Typography>
                            <Typography variant="h5">
                                소개문<br />
                                소개문<br />
                                소개문<br />
                            </Typography>
                            <Stack direction={'row'}>
                                <Button variant="outlined">팔로우하기</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                    
                </Grid>
                <Grid item xs={0} lg={2}>
                    
                </Grid>
            </Grid>
        </Box>
    )
}