import Grid from "@mui/material/Unstable_Grid2";
import {Checkbox, FormControlLabel, FormGroup, Paper, Typography , Button} from '@mui/material'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'


const Landing = () => {
    const [read,setRead]=useState(false)
    const [page,setPage] = useState(0)
    const nav=useNavigate()

    let content
    if (page===0) {
        content = <>

            <Typography component='h1' variant='h5' className='yekan-regular' sx={{fontWeight:'bold'}}>
                ستاد مجازی
                دکتر سید امیرحسین قاضی‌زاده هاشمی

            </Typography>

            <Typography component='h2' variant='h6' className='yekan-regular' sx={{mt: 3}}>

                کاندیدای چهاردهمین دوره ریاست جمهوری
            </Typography>

            <Typography className='yekan-regular' component='p' sx={{mt: 3}}>
                جهت دریافت حکم
                (هر خانواده یک ستاد)
                بر روی ادامه کلیک کنید
            </Typography>

            <Button variant='contained' color='primary' className='yekan-regular '  sx={{mt:3}}   onClick={()=>setPage(1)}>
                ادامه
            </Button>


        </>

    } else {
        content = <Typography className='yekan-regular' component='article' variant='body2' sx={{textAlign:'justify' , lineHeight:'2rem'}}>

            1-التزام به رهنمودهای مقام معظم رهبری از جمله اهتمام به حضور حداکثری همه اقشار مردم
            در
            انتخابات
            <br/>

            ۲ - معرفی ( دولت مردم دولت خانواده) دکتر سید امیر حسین قاضی زاده هاشمی به عنوان
            ادامه دهنده اهداف و سیاستهای دولت شهید رئیسی و نزدیک ترین و شبیه ترین کاندیدا از نظر
            تفکر اخلاق، منش، رفتار و سیاست و برنامه به شخص آیت ا... رئیسی در راستای اعتلای
            آرمانهای انقلاب اسلامی نهادینه کردن بنیاد خانواده و حمایت همه جانبه اقتصادی،
            فرهنگی، اجتماعی از این بنیاد مقدس
            <br/>
            3- رعایت اصول اخلاقی قانونمداری هم افزایی با سایر نهادها ، دوری از جدال و بد اخلاقی
            های انتخاباتی

            <br/>

            4- بهره گیری از روشهای خلاقانه تولید محتوا و ایجاد شبکه های انتشار و توزیع حداکثری
            تولیدات ستاد مرکزی در فضای مجازی و هماهنگی با گروه های مرجع و همراه نمودن دوستان
            آشنایان و خانواده
            <br/>

            <FormGroup sx={{mt:4}}>
                <FormControlLabel onChange={()=>setRead(!read)}  sx={{mr:0 }} control={<Checkbox sx={{pr:0}}  />} label={<span className='yekan-regular'> مطالب فوق را خوانده و قبول میکنم.</span>} />

            </FormGroup>
        </Typography>
    }

    return (
        <>

            <Grid container className='toppad' sx={{px: 6,minHeight:'100vh'  , backgroundImage: 'url(/asset/images/wallpaper.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'}}>

                <Grid xs={12}>
                    <Paper elevation={6} sx={{p: 3 , pt:0 , textAlign:'center'}}>


                        <img src='/asset/images/logo2.webp' style={{maxHeight:'5rem' , transform:'translateY(-2.5rem)'}}/>
                        <Grid container>
                            <Grid xs={12} sm={6}>
                                <img src="/asset/images/dr.jpg" alt="person" style={{maxWidth: '90%' , borderRadius:'1rem'}}/>
                            </Grid>


                            <Grid xs={12} sm={6} sx={{display:'flex',flexDirection:'column',justifyContent:'center'  , alignItems:'center'}}>

                                {content}




                            </Grid>



                            {
                                page !==0 &&     <Grid xs={12} sx={{mt:3}}>



                                    <Button variant='contained' color='primary' className='yekan-regular w100' disabled={!read} onClick={()=>nav('/login')}>
                                        ادامه
                                    </Button>

                                </Grid>
                            }




                        </Grid>
                    </Paper>


                </Grid>


            </Grid>


        </>
    )
}
export default Landing;