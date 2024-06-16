import axios from "axios";

export const url = 'http://192.168.1.111/api/v1'
export const baseurl = 'https://mis.ofoghiranianteam.ir'





// user has registered or not
export const checkRegisterationbyphone = (phone) => {
  return axios.post(`${url}/phone`,phone)
}



// user enters username and password to login
export const login = (code) => {
  return axios.post(`${url}/login`,code)
}



// provinces list
export const getProvinces = () => {
  return axios.get(`${url}/provinces`)
}


// gte cities
export const getCities = (provinceid) => {
  const config = {
    params: {
      province_id:provinceid
    }
  }
  return axios.get(`${url}/cities`,config)
}

// users personal info
export const saveUserinfo = (info) => {
  return axios.post(`${url}/register`,info)
}



//get users personal info
export const getInfo = (token) => {
  return axios.post(`${url}/info`,token)
}
