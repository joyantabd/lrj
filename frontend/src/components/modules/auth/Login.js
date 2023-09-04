import React, { useState } from 'react';
import axios from 'axios';
import Constants from '../../../Constants';


const Login = () => {

    const [input, SetInput] = useState({})
    const [errors,setErrors] =useState([])
    const [isloading,setIsLoading] = useState(false)

    const handleChange = (e) => SetInput(prevState => ({...prevState,[e.target.name] : e.target.value}))

    const handleSubmit = (e) =>{
      e.preventDefault();
      setIsLoading(true)
      axios.post(`${Constants.BASE_URL}/login`,input).then(res=>{
        localStorage.token = res.data.token
        localStorage.name = res.data.name
        localStorage.email = res.data.email
        localStorage.phone = res.data.phone
        localStorage.photo = res.data.photo
        localStorage.role = res.data.role
        localStorage.branch = JSON.stringify(res.data.branch)

        setIsLoading(false)
        window.location.reload()

      }).catch(errors=>{
        if(errors.response.status === 422)
        {
          setErrors(errors.response.data.errors)
          setIsLoading(false)
        }
      })

    }


    return (
        <div id="layoutAuthentication">
  <div id="layoutAuthentication_content">
    <main>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
              <div className="card-body">
                <form>
                  <div className="form-floating mb-3">
                    <input className= {errors.email !== undefined ? 'is-invalid form-control' : 'form-control'}  type="email" name='email'  value={input.email} onChange={handleChange}/>
                    <p className='login-error-msg'><small>{errors.email !== undefined ? errors.email[0] : null}</small></p>
                    <label htmlFor="inputEmail">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input className= {errors.password !== undefined ? 'is-invalid form-control' : 'form-control'} type="password" name='password' value={input.password} onChange={handleChange} />
                    <p className='login-error-msg'><small>{errors.password !== undefined ? errors.password[0] : null}</small></p>
                    <label htmlFor="inputPassword">Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <select className= {errors.user_type !== undefined ? 'is-invalid form-select' : 'form-select'} 
                    name='user_type' value={input.user_type} onChange={handleChange}>
                      <option >Select Role</option>
                      <option value={1}>Admin</option>
                      <option value={2}>Sales Manager</option>
                    </select>
                    <p className='login-error-msg'><small>{errors.user_type !== undefined ? errors.user_type[0] : null}</small></p>
                  </div>
                  <div className="form-check mb-3">
                    <input className="form-check-input" id="inputRememberPassword" type="checkbox" defaultValue />
                    <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                    <a className="small" href="password.html">Forgot Password?</a>
                    <button onClick={handleSubmit} className='btn btn-primary' dangerouslySetInnerHTML={{__html: isloading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading' : 'Login'}}></button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center py-3">
                <div className="small"><a href="register.html">Need an account? Sign up!</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>

    );
};

export default Login;