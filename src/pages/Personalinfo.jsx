import Grid from '@mui/material/Unstable_Grid2'
import {useFormik} from "formik";
import {
    Button,
    FormControl,

    MenuItem,
    Select,

    TextField,

} from "@mui/material";

import * as yup from "yup";

import {useState, useEffect} from "react";


import {useNavigate} from 'react-router-dom'
import {saveUserinfo, getProvinces, getCities, editUserinfo} from '../services/service.js'
import {toast} from "react-toastify";
import {Spinner} from '../components/index.js'


const Personalinfo = () => {


    const userphone = localStorage.getItem('userphone')
    const user = JSON.parse(localStorage.getItem('userinfo'))
    const nav = useNavigate()

    const [provinces, setProvinces] = useState(false)
    const [selectedprovinces, setselectedProvinces] = useState(false)
    const [cities, setCities] = useState(false)


    const getprovinces = async () => {
        const response = await getProvinces()
        if (response.data.code === 1) {
            setProvinces(response.data)
        }
    }


    const citiesList = async () => {
        const response = await getCities(selectedprovinces)
        if (response.data.code === 1) {
            setCities(response.data)
        }
    }
    useEffect(() => {

        getprovinces()
    }, []);


    useEffect(() => {
        citiesList()
    }, [selectedprovinces]);


    // avatar
    const [img, setImg] = useState(false)


    // loading animation
    const [loading, setLoading] = useState(false)


    const handlesubmit = async (val, image) => {

        // checking to see if NC pic is selected



        if (img === false) {
            toast.warning('انتخاب کارت ملی ضروری میباشد.')
        } else {
            // editing user info
            if (user && user.user.confirm == 2) {

                const formdataedit = new FormData()

                formdataedit.append('name', val.firstName)
                formdataedit.append('family', val.lastName)

                formdataedit.append('phone', val.tel)
                formdataedit.append('password', val.password)
                formdataedit.append('nc', val.nc)
                formdataedit.append('province_id', val.province)
                formdataedit.append('city_id', val.city)


                formdataedit.append('ncpic', image)
                formdataedit.append('token', user.user.token)


                setLoading(true)
                const response = await editUserinfo(formdataedit)
                if (response.data.code == 1) {

                    toast.success('اطلاعات شخصی شما با موفقیت بروز شد')
                    localStorage.setItem('userinfo', JSON.stringify(response.data))
                    nav('/home/results')
                    setLoading(false)
                } else {
                    toast.warning(response.data.error)
                    setLoading(false)
                }


            } else {

                const formdata = new FormData()

                formdata.append('name', val.firstName)
                formdata.append('family', val.lastName)

                formdata.append('phone', val.tel)
                formdata.append('password', val.password)
                formdata.append('nc', val.nc)
                formdata.append('province_id', val.province)
                formdata.append('city_id', val.city)


                formdata.append('ncpic', image)


                setLoading(true)
                const response = await saveUserinfo(formdata)
                if (response.data.code == 1) {

                    toast.success('اطلاعات شخصی شما با موفقیت ثبت شد')
                    localStorage.setItem('userinfo', JSON.stringify(response.data))
                    nav('/home/results')
                    setLoading(false)
                } else {
                    toast.warning(response.data.error)
                    setLoading(false)
                }

            }


        }


    }


    const validationSchema = yup.object({

        firstName: yup.string().max(25, 'نام بصورت صحیح وارد نشده').required('ضروری'),
        lastName: yup.string().max(40, ' باید کوتاه تر باشد').required('ضروری'),


        tel: yup.string().matches(/^[0-9]+$/, 'فقط عدد').length(11, 'شماره درست وارد نشده است').required('ضروری'),
        nc: yup.string().required('ضروری').matches(/^\d{10}$/, 'باید 10 رقم باشد'),
        province: yup.number().required('ضروری'),
        city: yup.number().required('ضروری'),


    });


    // having initial values dynamically change

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            tel: userphone ? userphone : user.user.phone,
            nc: '',
            province: '',
            city: '',
            password: ''

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handlesubmit(values, img)

        },
    });


    return (
        <>
            <Grid container className='toppad' sx={{px: 1}}>
                <Grid xs={12} sm={1}
                      sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>


                    <img src='/asset/images/logo.png' style={{maxHeight: '7rem'}}/>


                </Grid>


                <Grid xs={12} sm={11}>
                    <Grid container>
                        <Grid xs={12}>


                            <form onSubmit={formik.handleSubmit} className='yekan-regular'>
                                <Grid container columnSpacing={3} rowSpacing={5}
                                      sx={{'& .MuiInputBase-root': {fontFamily: 'yekan-reg'}}}>
                                    <Grid xs={12} sm={6}>
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

                                    <Grid xs={12} sm={6}>
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


                                    {/*row 2*/}

                                    <Grid xs={12} sm={6}>
                                        <FormControl className='w100' variant="outlined">

                                            <span className='yekan-regular'> شماره تلفن :  </span>
                                            <TextField
                                                disabled
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

                                    <Grid xs={12} sm={6}>
                                        <FormControl className='w100' variant="outlined">

                                            <span className='yekan-regular'> کد ملی :  </span>
                                            <TextField
                                                id="nc"
                                                name='nc'

                                                value={formik.values.nc}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}

                                                error={formik.touched.nc && Boolean(formik.errors.nc)}


                                                helperText={formik.touched.nc && formik.errors.nc}


                                            />


                                        </FormControl>
                                    </Grid>


                                    <Grid xs={12} sm={6}>
                                        <FormControl className='w100' variant="outlined">

                                            <span className='yekan-regular'> استان :  </span>
                                            <Select
                                                id="province"
                                                name='province'

                                                value={formik.values.province}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    setselectedProvinces(e.target.value)

                                                }}
                                                onBlur={formik.handleBlur}

                                                error={formik.touched.province && Boolean(formik.errors.province)}


                                                helperText={formik.touched.province && formik.errors.province}
                                            >
                                                <MenuItem className='yekan-regular' value="">
                                                    <em>انتخاب کنید</em>
                                                </MenuItem>
                                                {
                                                    provinces !== false ?
                                                        provinces.provinces.map((item) => (
                                                            <MenuItem key={item.id} value={item.id}
                                                                      className='yekan-regular'>
                                                                {item.name}
                                                            </MenuItem>
                                                        ))
                                                        :

                                                        <Spinner/>
                                                }


                                            </Select>


                                        </FormControl>
                                    </Grid>

                                    <Grid xs={12} sm={6}>
                                        <FormControl className='w100' variant="outlined">

                                            <span className='yekan-regular'> شهر :  </span>
                                            <Select


                                                id="city"
                                                name='city'

                                                value={formik.values.city}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}

                                                error={formik.touched.city && Boolean(formik.errors.city)}


                                                helperText={formik.touched.city && formik.errors.city}
                                            >
                                                <MenuItem className='yekan-regular' value="">
                                                    <em>انتخاب کنید</em>
                                                </MenuItem>
                                                {
                                                    cities !== false ?
                                                        cities.cities.map((item) => (
                                                            <MenuItem key={item.id} value={item.id}
                                                                      className='yekan-regular'>
                                                                {item.name}
                                                            </MenuItem>
                                                        ))
                                                        :

                                                        <Spinner/>
                                                }


                                            </Select>


                                        </FormControl>
                                    </Grid>


                                    {
                                        user && user.user.confirm == 2 ?
                                            null : <Grid xs={12} sm={6}>
                                                <FormControl className='w100' variant="outlined">

                                                    <span className='yekan-regular'> رمز عبور :  </span>
                                                    <TextField
                                                        id="password"
                                                        name='password'
                                                        type='password'
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}

                                                        error={formik.touched.password && Boolean(formik.errors.password)}


                                                        helperText={formik.touched.password && formik.errors.password}


                                                    />


                                                </FormControl>
                                            </Grid>

                                    }


                                    <Grid xs={12} sm={6}>
                                        <FormControl className='w100' variant="outlined"
                                                     sx={{alignItems: 'center', justifyContent: 'baseline'}}>
                                            <span className='yekan-regular'> تصویر کارت ملی :  </span>
                                            <img
                                                src={img == false ? '/asset/images/placeholder.jpg' : URL.createObjectURL(img)}
                                                alt="avatar" style={{maxHeight: '14rem'}}/>

                                            <input onChange={(e) => setImg(e.target.files[0])} className='yekan input'
                                                   type='file' id="img"
                                                   name="img"/>


                                        </FormControl>
                                    </Grid>


                                    <Grid xs={12} sx={{display: 'flex', justifyContent: 'end'}}>
                                        {
                                            loading ? <Spinner/> : <Button className='yekan-regular w100' type='submit'
                                                                           variant="contained">ادامه</Button>
                                        }

                                    </Grid>


                                </Grid>
                            </form>

                        </Grid>


                    </Grid>
                </Grid>

            </Grid>


        </>
    )
}
export default Personalinfo;