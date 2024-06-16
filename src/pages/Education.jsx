
import Grid from "@mui/material/Unstable_Grid2";
import {Button,Divider} from '@mui/material'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Kardani, Karshenasi , KarshenasiArshad , Phd} from '../components/index.js'
import {setstep, userselector} from "../slices/userSlice.js";
import {toast} from "react-toastify";


const Education = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const user = useSelector(userselector)

    const handleNext = () => {
      if (user.education1 !==false || user.education2 !==false || user.education3 !==false || user.education4 !==false) {
          dispatch(setstep(3))
          nav('/ats/professional')
      } else {
          toast.warning('وارد کردن حداقل یکی از مقاطع تحصیلی اجباری میباشد.')
      }
    }



    return (
        <>
            <Grid container className='margins' sx={{'& .MuiInputBase-root': {fontFamily: 'yekan-reg'}}}>

                <Kardani/>

                <Karshenasi/>
                <KarshenasiArshad/>
                <Phd/>

                <Grid xs={12} sx={{textAlign:'center'}}>

                    <Button variant="contained" className='yekan-regular' onClick={handleNext}>
                        ادامه
                    </Button>

                </Grid>


            </Grid>


        </>
    )
}
export default Education;