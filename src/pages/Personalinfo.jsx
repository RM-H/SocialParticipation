import Grid from '@mui/material/Unstable_Grid2'
import {useFormik} from "formik";
import {
    Button,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Step, StepButton,
    Stepper,
    TextField
} from "@mui/material";

import * as yup from "yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {setstep, userselector, setuser} from '../slices/userSlice.js'
import {useNavigate} from 'react-router-dom'
import {saveUserinfo, baseurl} from '../services/service.js'
import {toast} from "react-toastify";
import {Spinner} from '../components/index.js'


const Personalinfo = () => {

    const dispatch = useDispatch()
    const user = useSelector(userselector)
    const nav = useNavigate()

    // birthday
    const [date, setDate] = useState(new Date().toLocaleDateString('fa-IR'))

    // avatar
    const [img, setImg] = useState('')


    // loading animation
    const [loading, setLoading] = useState(false)


    const handlesubmit = async (val, date, image) => {

        const formdata = new FormData()
        formdata.append('token', user.user.token)
        formdata.append('name', val.firstName)
        formdata.append('family', val.lastName)
        formdata.append('birth', date)
        formdata.append('tell', val.tel)
        formdata.append('email', val.email)
        formdata.append('about', val.about)
        formdata.append('address', val.address)
        formdata.append('marriage', val.maritalStatus)
        formdata.append('soldier', val.service)
        formdata.append('avatar', image)


        setLoading(true)
        const response = await saveUserinfo(formdata)
        if (response.data.code == 1) {
            dispatch(setuser(response.data));
            toast.success('اطلاعات شخصی شما با موفقیت ثبت شد')
            setLoading(false)
        } else {
            toast.warning(response.data.error)
            setLoading(false)
        }


        dispatch(setstep(2))
        nav('/ats/education')

    }





    const validationSchema = yup.object({

        firstName: yup.string().max(25, 'نام بصورت صحیح وارد نشده').required('ضروری'),
        lastName: yup.string().max(40, ' باید کوتاه تر باشد').required('ضروری'),

        email: yup.string().email().required('ضروری'),
        service: yup.number().required('ضروری'),
        maritalStatus: yup.number().required('ضروری'),
        nationality: yup.string().max(50, ' باید کوتاه تر باشد').required('ضروری'),

        about: yup.string().max(500, ' باید کوتاه تر باشد').required('ضروری'),
        address: yup.string().max(500, ' باید کوتاه تر باشد').required('ضروری'),
        tel: yup.string().matches(/^[0-9]+$/, 'فقط عدد').length(11, 'شماره درست وارد نشده است').required('ضروری')

    });


    // having initial values dynamically change

    const formik = useFormik({
        initialValues: {
            firstName: user.user.name ? user.user.name : '',
            lastName: user.user.family ? user.user.family : '',
            email: user.user.email ? user.user.email : '',
            service: user.user.soldier ? user.user.soldier : '',
            maritalStatus: user.user.marriage ? user.user.marriage : '',
            nationality: '',
            about: user.user.about ? user.user.about : '',
            address: user.user.address ? user.user.address : '',
            tel: user.user.tell ? user.user.tell : ''
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            handlesubmit(values, date, img)
        },
    });


    return (
        <>
            <Grid container className='margins'>
                <Grid xs={12}>


                    <form onSubmit={formik.handleSubmit} className='yekan-regular'>
                        <Grid container columnSpacing={3} rowSpacing={5}
                              sx={{'& .MuiInputBase-root': {fontFamily: 'yekan-reg'}}}>
                            <Grid xs={6}>
                                <FormControl className='w100 yekan-regular' variant="outlined">

                                    <span className='yekan-regular'> نام  :  </span>
                                    <TextField

                                        id="firstName"
                                        name='firstName'

                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}


                                        helperText={formik.touched.firstName && formik.errors.firstName}

                                    />


                                </FormControl>
                            </Grid>

                            <Grid xs={6}>
                                <FormControl className='w100' variant="outlined">

                                    <span className='yekan-regular'> نام خانوادگی :  </span>
                                    <TextField
                                        id="lastName"
                                        name='lastName'
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}


                                        helperText={formik.touched.lastName && formik.errors.lastName}

                                    />


                                </FormControl>
                            </Grid>


                            <Grid xs={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>


                                <span className='yekan-regular'> تاریخ تولد :  </span>


                                <DatePicker style={{
                                    fontFamily: 'yekan-reg',
                                    fontSize: '1rem',
                                    padding: '1rem',
                                    textAlign: 'center'
                                }} className='yekan-regular' onChange={setDate} calendar={persian}
                                            locale={persian_fa}
                                            value={date}/>


                            </Grid>

                            <Grid xs={4}>
                                <FormControl className='w100' variant="outlined">

                                    <span className='yekan-regular'> شماره ثابت :  </span>
                                    <TextField
                                        id="tel"
                                        name='tel'
                                        value={formik.values.tel}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                        error={formik.touched.tel && Boolean(formik.errors.tel)}


                                        helperText={formik.touched.tel && formik.errors.tel}

                                    />


                                </FormControl>
                            </Grid>

                            <Grid xs={4}>
                                <FormControl className='w100' variant="outlined">

                                    <span className='yekan-regular'> ایمیل :  </span>
                                    <TextField
                                        id="email"
                                        name='email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                        error={formik.touched.email && Boolean(formik.errors.email)}


                                        helperText={formik.touched.email && formik.errors.email}


                                    />


                                </FormControl>
                            </Grid>

                            <Grid xs={10}>
                                <FormControl className='w100' variant="outlined">

                                    <span className='yekan-regular'> درباره من :  </span>
                                    <TextField
                                        id="about"
                                        name='about'
                                        multiline
                                        rows={4}
                                        value={formik.values.about}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                        error={formik.touched.about && Boolean(formik.errors.about)}


                                        helperText={formik.touched.about && formik.errors.about}

                                    />


                                </FormControl>
                            </Grid>
                            <Grid xs={2}>
                                <FormControl className='w100' variant="outlined"
                                             sx={{alignItems: 'center', justifyContent: 'baseline'}}>
                                    <span className='yekan-regular'> تصویر :  </span>
                                    <img src={img == '' ? `${baseurl}/${user.user.avatar}` : URL.createObjectURL(img)}
                                         alt="avatar" width='31%'/>

                                    <input onChange={(e) => setImg(e.target.files[0])} className='yekan input'
                                           type='file' id="img"
                                           name="img"/>


                                </FormControl>
                            </Grid>

                            <Grid xs={12}>
                                <FormControl className='w100' variant="outlined">

                                    <span className='yekan-regular'> آدرس :  </span>
                                    <TextField
                                        id="address"
                                        name='address'
                                        multiline
                                        rows={2}
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                        error={formik.touched.address && Boolean(formik.errors.address)}


                                        helperText={formik.touched.address && formik.errors.address}

                                    />


                                </FormControl>
                            </Grid>

                            <Grid xs={4}>
                                <FormControl className='w100' variant="outlined">

                                    <span className='yekan-regular'> ملیت :  </span>
                                    <TextField
                                        id="nationality"
                                        name='nationality'

                                        value={formik.values.nationality}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                        error={formik.touched.nationality && Boolean(formik.errors.nationality)}


                                        helperText={formik.touched.nationality && formik.errors.nationality}

                                    />


                                </FormControl>
                            </Grid>

                            <Grid xs={4}>
                                <FormControl className='w100' variant="standard">

                                    <span className='yekan-regular'> وضعیت تاهل :  </span>
                                    <Select
                                        id="maritalStatus"
                                        name='maritalStatus'

                                        value={formik.values.maritalStatus}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                        error={formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)}


                                        helperText={formik.touched.maritalStatus && formik.errors.maritalStatus}
                                    >
                                        <MenuItem className='yekan-regular' value="">
                                            <em>انتخاب کنید</em>
                                        </MenuItem>
                                        <MenuItem className='yekan-regular' value={1}>مجرد</MenuItem>
                                        <MenuItem className='yekan-regular' value={2}>متاهل</MenuItem>

                                    </Select>


                                </FormControl>
                            </Grid>

                            <Grid xs={4}>
                                <FormControl className='w100' variant="standard">

                                    <span className='yekan-regular'> وضعیت نظام وظیفه :  </span>
                                    <Select
                                        id="service"
                                        name='service'

                                        value={formik.values.service}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                        error={formik.touched.service && Boolean(formik.errors.service)}


                                        helperText={formik.touched.service && formik.errors.service}
                                    >
                                        <MenuItem className='yekan-regular' value="">
                                            <em>انتخاب کنید</em>
                                        </MenuItem>
                                        <MenuItem className='yekan-regular' value={1}> پایان خدمت / معافیت
                                            دائم</MenuItem>
                                        <MenuItem className='yekan-regular' value={2}>معافیت تحصیلی/موقت</MenuItem>


                                    </Select>


                                </FormControl>
                            </Grid>

                            <Grid xs={12} sx={{textAlign: 'center'}}>
                                {
                                    loading? <Spinner/> :<Button className='yekan-regular' type='submit' variant="contained">ادامه</Button>
                                }

                            </Grid>


                        </Grid>
                    </form>

                </Grid>


            </Grid>


        </>
    )
}
export default Personalinfo;