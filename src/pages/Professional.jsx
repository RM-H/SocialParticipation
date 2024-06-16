import * as yup from "yup";
import {Field, Form, Formik, useFormik} from "formik";
import Grid from "@mui/material/Unstable_Grid2";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Button, Checkbox,
    FormControl,
    FormControlLabel,
    TextField,
    Typography
} from "@mui/material";

import {useEffect, useState} from "react";
import {Workitem, Spinner} from '../components/index.js'
import {useDispatch, useSelector} from "react-redux";
import {workselector, userselector, setuser, setstep} from "../slices/userSlice.js";
import {saveWorks} from '../services/service.js'
import {toast} from "react-toastify";


const Professional = () => {

    // controlling loading

    const [loading, setLoading] = useState(false)

    // work items in redux
    const works = useSelector(workselector)
    const dispatch = useDispatch()
    // user info
    const user = useSelector(userselector)




    // adding work items to fields

    useEffect(() => {
        if (user.works !==false){

            let items =[]
            user.works.map((item)=>{
                items.push(item.company)

            })
            setFileds(items)
        }
    }, []);




    const handleNext = async () => {
        const formdata = new FormData()
        formdata.append("token", user.user.token)
        formdata.append('data', JSON.stringify(works))


        setLoading(true)

        const response = await saveWorks(formdata)
        if (response.data.code == 1) {
            toast.success('سوابق شغلی با موفقیت اضافه شد.')
            dispatch(setstep(4))
            dispatch(setuser(response.data))
            setLoading(false)
            console.log(response.data)

        } else {
            setLoading(false)
            toast.warning(response.data.error)
        }


    }


    // adding a new form for professional history
    const [fields, setFileds] = useState([])


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


    const addnewfield = useFormik({
        initialValues: {
            title: '',

        },
        validationSchema: yup.object({

            title: yup.string().max(70, 'نام بصورت صحیح وارد نشده').required('ضروری'),


        }),
        onSubmit: (values, actions) => {
            handleadd(values);
            actions.resetForm()

        },
    });
    const handleadd = (val) => {




        let copy = [...fields, val.title];

        setFileds(copy)


    }

    let content


    if (fields !== false) {

        content = fields.map((item, index) => {


                return (
                    <Workitem item={item} key={index} fields={fields} setfields={setFileds}/>

                )
            }
        )
    }


    return (
        <>


            <Grid container className='margins' sx={{'& .MuiInputBase-root': {fontFamily: 'yekan-reg'}}}>



                {
                    content
                }


                <Grid xs={12} sx={{textAlign: 'center'}}>

                    {
                        loading ? <Spinner/> :
                            <Button className='yekan-regular' onClick={handleNext} variant="contained">ادامه</Button>
                    }

                </Grid>


                <Grid xs={12}>
                    <form onSubmit={addnewfield.handleSubmit}>


                        <FormControl className='w100' variant="outlined">

                            <span className='yekan-regular'> عنوان شرکت یا محل کار  :  </span>
                            <TextField
                                id="title"
                                name='title'

                                value={addnewfield.values.title}
                                onChange={addnewfield.handleChange}
                                onBlur={addnewfield.handleBlur}

                                error={addnewfield.touched.title && Boolean(addnewfield.errors.title)}


                                helperText={addnewfield.touched.title && addnewfield.errors.title}

                            />


                        </FormControl>
                        <Button className='yekan-regular' type='submit' variant="contained" sx={{my: 2}}>+</Button>

                    </form>
                </Grid>


            </Grid>


        </>
    )
}
export default Professional;