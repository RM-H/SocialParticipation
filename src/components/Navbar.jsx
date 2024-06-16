import * as React from 'react';
import {
    AppBar, Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Toolbar,
    Typography
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import {useState} from "react";
import {Menu, Logout} from '@mui/icons-material'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from "react-redux";
import {userselector} from "../slices/userSlice.js";

const Navbar = (props) => {
    const user = useSelector(userselector)
    const [activePage, setActivePage] = useState(0)
    const handleActivePage = (page) => {
        setActivePage(page)
    }
    const drawerWidth = 240;
    const {window} = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setTimeout(() => setMobileOpen((prevState) => !prevState), 200)

    };

    const nav = useNavigate()
    const drawer = (
        <Box className='yekan-regular' sx={{textAlign: 'center'}}>
            <Typography className='yekan-regular' onClick={() => {
                nav('/');
                handleActivePage(0)
                handleDrawerToggle()
            }} variant="h6" sx={{my: 2}}>
                کلینیک ستارزاده
            </Typography>

            <Divider sx={{my: 1}}/>


            <List sx={{
                '& .Mui-selected': {
                    border: '0.15rem dashed #1a5ca4',
                    borderRadius: '0.5rem',
                    backgroundColor: '#ffffff',
                    mx: 1,
                    justifyContent: 'start',
                    pr: '2rem'
                }
            }}>

                <ListItem onClick={handleDrawerToggle} disablePadding>
                    <ListItemButton selected={activePage === 0} onClick={() => {
                        nav('/');
                        handleActivePage(0)
                    }}
                                    sx={{textAlign: 'center', height: '3rem'}}>
                        <Typography className='yekan' variant="h6" sx={{my: 2}}>
                            صفحه اصلی
                        </Typography>
                    </ListItemButton>
                </ListItem>

                <ListItem onClick={handleDrawerToggle} disablePadding>
                    <ListItemButton selected={activePage === 1} onClick={() => {
                        setTimeout(() => {
                            let el = document.getElementById('services');
                            el.scrollIntoView({behavior: "smooth"})
                        }, 200)
                        nav('/');
                        handleActivePage(1)
                    }}
                                    sx={{textAlign: 'center', height: '3rem'}}>
                        <Typography className='yekan' variant="h6" sx={{my: 2}}>
                            خدمات کلینیک
                        </Typography>
                    </ListItemButton>
                </ListItem>

                <ListItem onClick={handleDrawerToggle} disablePadding>
                    <ListItemButton selected={activePage === 2} onClick={() => {
                        nav('/blogs/');
                        handleActivePage(2)
                    }} sx={{textAlign: 'center', height: '3rem'}}>
                        <Typography className='yekan' variant="h6" sx={{my: 2}}>
                            بلاگ
                        </Typography>
                    </ListItemButton>
                </ListItem>


                <ListItem onClick={handleDrawerToggle} disablePadding>
                    <ListItemButton selected={activePage === 4} onClick={() => {
                        nav('/contact/');
                        handleActivePage(4)
                    }} sx={{textAlign: 'center', height: '3rem'}}>
                        <Typography className='yekan' variant="h6" sx={{my: 2}}>
                            درباره ما
                        </Typography>
                    </ListItemButton>
                </ListItem>


            </List>
        </Box>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <>


            {/*Responsive Drawer*/}
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    anchor='right'
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'block', md: 'block'},
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: 'rgba(255, 255, 255, 0.93)',
                            backdropFilter: 'blur(3px)',
                            borderLeft: '0.3rem solid #CAF4FF'
                        },

                    }}
                >

                    {drawer}
                </Drawer>
            </nav>

            {/*Responsive Drawer*/}
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
                            onClick={handleDrawerToggle}
                            sx={{ml: 1, display: {md: 'none'}}}

                        >
                            <Menu/>
                        </IconButton>

                        <Grid container sx={{width: '100%', display: {xs: 'none', md: 'flex'},}}>

                            <Grid xs={2} sx={{display: 'flex', justifyContent: 'center'}}>

                                <img src="/assets/images/logo.png" alt="logo" style={{borderRadius: '50%'}} width={100}
                                />
                            </Grid>


                            <Grid xs={5} sx={{display: 'flex' , alignItems:'center'}}>



                                <Typography component='p' className='yekan-regular clrtwotext'>
                                    {
                                        user.user.name ? user.user.name : user.user.phone ? user.user.phone:'کارجو'
                                    }
                                    {' '}
                                    عزیز به سیستم رهگیری استخدام افق ایرانیان خوش آمدید.

                                </Typography>




                            </Grid>


                            <Grid xs={5} sx={{display: 'flex', justifyContent: 'end'}}>

                                <Button onClick={() => nav('/')} className='underline yekan-regular clrblack'
                                        color="primary">


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