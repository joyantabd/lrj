import axios from "axios";
import GlobalFunction from './GlobalFunction'

axios.interceptors.request.use(function (config) {
        if (localStorage.token != undefined) 
        {
          config.headers['Authorization'] = `Bearer ${localStorage.token}`
        }
      return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  })

  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if(error.response.status == 401)
    {
        GlobalFunction.Logout()

    }
    // else if(error.response.status == 500)
    // {
    //     // window.location.href = window.location.origin
    // }
    return Promise.reject(error);
  });