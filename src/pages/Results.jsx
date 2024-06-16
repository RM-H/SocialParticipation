import Grid from "@mui/material/Unstable_Grid2";
import {useEffect, useState} from "react";
import {getInfo} from '../services/service.js'
import {Typography, Button} from '@mui/material'
import {Spinner} from '../components/index.js'

const Results = () => {
    const user = JSON.parse(localStorage.getItem('userinfo'))

    const [data, setData] = useState(false)


    const getuserino = async () => {
        const formdata = new FormData()
        formdata.append('token', user.user.token)
        const response = await getInfo(formdata)
        if (response.data.code === 1) {
            setData(response.data)
        } else {

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

                    <Button onClick={()=>{
                        setData(false);
                            getuserino()
                    }} className='yekan-regular' variant='contained' color='warning' sx={{mt:3}}>
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

                </>


        } else {


            content =
                <>

                    <Typography variant='h5' className='yekan-regular clrseventext'>
                        درخواست شما تایید شده است.

                    </Typography>

                    <Button color='success' className='yekan-regular' variant='contained' sx={{mt: 3}}>
                        چاپ
                    </Button>
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
                backgroundImage: 'url(/assets/images/wallpaper.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>

                <Grid xs={10} sm={5} className='clrtwo' sx={{
                    minHeight: '21rem',
                    borderRadius: '0.6rem',
                    p: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>

                    {content}

                </Grid>


            </Grid>


        </>
    )
}
export default Results;