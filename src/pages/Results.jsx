import Grid from "@mui/material/Unstable_Grid2";
import {useEffect, useState} from "react";
import {getInfo, baseurl} from '../services/service.js'
import {Typography, Button, ButtonGroup} from '@mui/material'
import {Spinner} from '../components/index.js'

import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {toast} from "react-toastify";
import {Print, Refresh} from '@mui/icons-material'

const Results = () => {
    const user = JSON.parse(localStorage.getItem('userinfo'))

    const nav = useNavigate()
    const [data, setData] = useState(false)


    const getuserino = async () => {
        const formdata = new FormData()
        formdata.append('token', user.user.token)
        const response = await getInfo(formdata)
        if (response.data.code === 1) {
            setData(response.data)
            if (response.data.user.confirm == 2) {
                localStorage.setItem('userinfo', JSON.stringify(response.data))
            }


        } else {
            toast.warning(response.data.error)

        }
    }
    useEffect(() => {

        getuserino()
    }, []);


    let content
    if (data !== false) {


        if (data.user.confirm == 0) {
            content =
                <>
                    <Typography component='p' variant='h5' className='yekan-regular clrseventext'>
                        درخواست شما در انتظار تایید است


                    </Typography>

                    <Button onClick={() => {
                        setData(false);
                        getuserino()
                    }} className='yekan-regular' variant='contained' color='warning' sx={{mt: 3}}>
                        <Refresh/>
                        بروزرسانی
                    </Button>

                </>


        } else if (data.user.confirm == 2) {
            content =

                <>
                    <Typography component='p' variant='h5' className='yekan-regular clrseventext'>
                        متاسفانه درخواست شما رد شده است.

                    </Typography>
                    <Typography component='p' className='yekan-regular clrseventext'>
                        علت رد :
                        {' '}
                        {data.user.reject}

                    </Typography>

                    <Button onClick={() => {
                        nav('/home')

                    }} className='yekan-regular' variant='contained' color='warning' sx={{mt: 3}}>
                        ویرایش اطلاعات ثبت نامی
                    </Button>


                </>


        } else {


            content =
                <>

                    <Typography variant='h5' className='yekan-regular clrseventext'>
                        درخواست شما تایید شده است.

                    </Typography>

                    <Link to={`${baseurl}/api/v1/print?token=${data.user.token}`} target={'_blank'}>
                        <Button color='success' className='yekan-regular' variant='contained' sx={{mt: 3}}>
                            <Print/>
                            چاپ
                        </Button>
                    </Link>

                </>

        }


    } else {
        content = <Spinner/>
    }
    return (
        <>

            <Grid container sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url(/asset/images/wallpaper.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>

                <Grid xs={10} sm={5} className='clrtwo' sx={{
                    minHeight: '21rem',
                    borderRadius: '0.6rem',
                    p: 3,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>

                    {content}



                       <div style={{textAlign:'center'}}>
                           <p className='yekan-regular clrseventext ' style={{paddingBottom:'1rem'}}>
                               ما را در شبکه های اجتماعی دنبال کنید:
                           </p>
                           <Link to='https://t.me/s_a_ghazizadeh' target='_blank'>
                               <img src="/asset/images/telegram.png" alt="telegram"  style={{maxWidth:'2.5rem' , marginRight:'0.5rem' , marginLeft:'0.5rem ' , backgroundColor:'white' , borderRadius:'0.6rem' , padding:'0.1rem'}}/>
                           </Link>

                           <Link to='https://eitaa.com/s_a_ghazizadeh' target='_blank'>
                               <img src="/asset/images/ita.png" alt="ita"  style={{maxWidth:'2.5rem' , marginRight:'0.5rem' , marginLeft:'0.5rem ' , backgroundColor:'white' , borderRadius:'0.6rem' , padding:'0.1rem'}}/>
                           </Link>

                           <Link to='https://ble.ir/s_a_ghazizadeh' target='_blank'>
                               <img src="/asset/images/bale.png" alt="bale"  style={{maxWidth:'2.5rem' , marginRight:'0.5rem' , marginLeft:'0.5rem ' , backgroundColor:'white' , borderRadius:'0.6rem' , padding:'0.1rem'}}/>
                           </Link>

                           <Link to='https://rubika.ir/s_a_ghazizadeh' target='_blank'>
                               <img src="/asset/images/rubica.png" alt="rubica"  style={{maxWidth:'2.5rem' , marginRight:'0.5rem' , marginLeft:'0.5rem ' , backgroundColor:'white' , borderRadius:'0.6rem' , padding:'0.1rem'}}/>
                           </Link>


                       </div>

                </Grid>




            </Grid>


        </>
    )
}
export default Results;