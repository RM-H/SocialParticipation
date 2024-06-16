import Grid from "@mui/material/Unstable_Grid2";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    FormControlLabel,
    Typography
} from "@mui/material";
import {ArrowDownward, DeleteOutlined} from "@mui/icons-material";
import {Field, Form, Formik} from "formik";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setwork, workselector, updatework, deleteWorkitem, userselector} from '../../slices/userSlice.js'

const Workitem = ({item, fields, setfields}) => {

    const [stardate, setstartDate] = useState('')
    const [enddate, setendDate] = useState('')
    const dispatch = useDispatch()

    const [working, setworking] = useState(false)


    // adding items to be sent to api
    const worksinredux = useSelector(workselector)


    const user = useSelector(userselector)



    // checking to see if youser has work items so that he can edit them
    const filtered = user.works.filter((workitem)=>{
        return  workitem.company==item
    })
    let init =    {
        name:user.works !==false && filtered.length>0 ?filtered[0].company :  item,
        jobtitle: user.works !==false && filtered.length>0 ?filtered[0].jobtitle : '',
        salary: user.works !==false && filtered.length>0 ?filtered[0].salary : 0
    }


    // setting dates if items exist
    useEffect(() => {
        if (user.works !==false && filtered.length>0) {
            setstartDate(filtered[0].start_date)
            setendDate(filtered[0].end_date)
            setworking(filtered[0].working)
        }
    }, []);







    const handleitemdelete = () => {
        const filtered = fields.filter((i) => (
            i !== item
        ))


        setfields(filtered);
        dispatch(deleteWorkitem(item))
    }


    const handleaggregatework = (values, start, end, status) => {


        // handling edits in redux
        let filtered = worksinredux.findIndex((work) => {
            return work.company == values.name
        })

        if (filtered !== -1) {
            // item exists and needs to be update
            let workitem = {
                company: values.name,
                jobtitle: values.jobtitle,
                salary: values.salary,
                start_date: start,
                end_date: end,
                working: status,
                index: filtered
            }

            dispatch(updatework(workitem))


        } else {
            // new item is to be created

            let workitem = {
                company: values.name,
                jobtitle: values.jobtitle,
                salary: values.salary,
                start_date: start,
                end_date: end,
                working: status
            }
            dispatch(setwork(workitem))
        }


    }


    return (
        <>

            <Grid sx={{my: 3}} xs={12}>
                <button onClick={()=>console.log(working)}>
                    s
                </button>

                <Accordion defaultExpanded className='shadowone' sx={{p: 3}}>
                    <AccordionSummary
                        expandIcon={<ArrowDownward/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography variant='h5' className='yekan-regular'>
                            {item}
                        </Typography>


                        <Button onClick={handleitemdelete} variant="outlined" color="error" sx={{mr: 'auto', ml: 9}}>
                            <DeleteOutlined/>
                        </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Formik
                            initialValues={init}


                            onSubmit={values => {

                                handleaggregatework(values, stardate, enddate, working)
                            }}
                        >

                            <Form>


                                <Grid container spacing={4}>


                                    <Grid xs={6}>
                                        <label className="label">نام محل کار :</label>
                                        <Field className="input is-info" name='name' disabled/>
                                    </Grid>

                                    <Grid xs={6}>
                                        <label className="label">عنوان شغلی/پست :</label>
                                        <Field className="input is-info" name='jobtitle'/>
                                    </Grid>

                                    <Grid xs={4}>
                                        <label className="label">تاریخ شروع همکاری :</label>
                                        <DatePicker style={{
                                            fontFamily: 'yekan-reg',
                                            fontSize: '1rem',
                                            padding: '1rem',
                                            textAlign: 'center'
                                        }} className='yekan-regular' onChange={setstartDate} calendar={persian}
                                                    locale={persian_fa} value={stardate}

                                        />
                                    </Grid>
                                    <Grid xs={4}>
                                        <label className="label">تاریخ پایان همکاری :</label>
                                        <DatePicker disabled={working} style={{
                                            fontFamily: 'yekan-reg',
                                            fontSize: '1rem',
                                            padding: '1rem',
                                            textAlign: 'center'
                                        }} className='yekan-regular' onChange={setendDate} calendar={persian}
                                                    locale={persian_fa} value={enddate}

                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={working} onChange={() => setworking((prev) => !prev)}/>}
                                            label={<span className='yekan-regular'>مشغول به کار هسنم </span>}/>
                                    </Grid>
                                    <Grid xs={4}>
                                        <label className="label">حقوق :</label>
                                        <Field className="input is-info" name='salary'/>
                                    </Grid>


                                </Grid>


                                <Button variant="contained" color='success' className='yekan-regular w100' type="submit"
                                        sx={{mt: 4}}>ذخیره تغییرات</Button>


                            </Form>

                        </Formik>


                    </AccordionDetails>

                </Accordion>
            </Grid>


        </>
    )
}
export default Workitem