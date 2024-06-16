import axios from "axios";

export const url = 'https://mis.ofoghiranianteam.ir/api/v1/ats'
export const baseurl = 'https://mis.ofoghiranianteam.ir'





// user enters number to get sms
export const getSms = (phone) => {
  return axios.post(`${url}/phone`,phone)
}



// user enters the code recived in sms to get the toekn
export const verifySmsCode = (code) => {
  return axios.post(`${url}/code`,code)
}



// splash info
export const getSplash = () => {
  return axios.get(`${url}/splash`)
}


// department selection
export const selectDepartment = (dep) => {
  return axios.post(`${url}/savedepartemant`,dep)
}

// users personal info
export const saveUserinfo = (info) => {
  return axios.post(`${url}/savepersonal`,info)
}

// users kardani education
export const saveKardani = (education) => {
  return axios.post(`${url}/saveeducation1`,education)
}

// users karshenasi education
export const saveKarshenasi = (education) => {
  return axios.post(`${url}/saveeducation2`,education)
}



// users karshenasi arshad education
export const saveKarshenasiArshad = (education) => {
  return axios.post(`${url}/saveeducation3`,education)
}


// users phd education
export const savePhd = (education) => {
  return axios.post(`${url}/saveeducation4`,education)
}


// users professional history
export const saveWorks = (works) => {
  return axios.post(`${url}/saveworks`,works)
}