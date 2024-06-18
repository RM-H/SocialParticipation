
import {
    AppBar,
    Box,
    Button,

    IconButton,

    Toolbar,
    Typography
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import {useState} from "react";
import { Logout} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'


const Navbar = (props) => {
    const user = JSON.parse(localStorage.getItem('userinfo'))




    const nav = useNavigate()

    return (
        <>


            <Box sx={{flexGrow: 1, direction: 'rtl'}}>
                <AppBar position="fixed" sx={{
                    '&.MuiAppBar-root': {
                        backgroundColor: 'rgba(255,255,255,0.36)',
                        backdropFilter: 'blur(1rem)'

                    }
                }}>
                    <Toolbar>
                        <IconButton
                            color="black"
                            aria-label="open drawer"
                            edge="start"

                            className='w100'
                            sx={{ml: 1, display: {md: 'none'} , justifyContent:'space-between' }}

                        >
                            <Typography component='p' className='yekan-regular clrtwotext'>
                                {
                                    user && user.user.name ? user.user.name : ''
                                }
                                {' '}
                                خوش آمدید.

                            </Typography>

                            <Button onClick={() => {
                                localStorage.clear();
                                nav('/')
                            }}
                                    className='underline yekan-regular clrblack'
                                    color="error" >


                                خروج
                                <Logout/>
                            </Button>
                        </IconButton>

                        <Grid container sx={{width: '100%', display: {xs: 'none', md: 'flex'},}}>

                            <Grid xs={2} sx={{display: 'flex', justifyContent: 'center'}}>

                                <img src="/asset/images/logo2.webp" alt="logo" width={100}
                                />
                            </Grid>


                            <Grid xs={12} sm={5} sx={{display: 'flex', alignItems: 'center'}}>


                                <Typography component='p' className='yekan-regular clrtwotext'>
                                    {
                                        user && user.user.name ? user.user.name : ''
                                    }
                                    {' '}
                                    خوش آمدید.

                                </Typography>


                            </Grid>


                            <Grid xs={5} sx={{display: 'flex', justifyContent: 'end'}}>

                                <Button onClick={() => {
                                    localStorage.clear();
                                    nav('/')
                                }}
                                        className='underline yekan-regular clrblack'
                                        color="error">


                                    خروج
                                    <Logout/>
                                </Button>
                            </Grid>


                        </Grid>

                    </Toolbar>
                </AppBar>
            </Box>

        </>
    );
}
export default Navbar;