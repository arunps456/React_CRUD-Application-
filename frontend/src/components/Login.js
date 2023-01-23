import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik'
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required")
});





function Login() {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    axios.post('http://localhost:4000/user/login', {
          email: values.email,
          password: values.password
      }).then((res) => {
        if(res.data.token){
          navigate("/productlist")
        }
      });

  }

  return (
    <section className="vh-100 ">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark  text-white">
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                      handleSubmit(values)  
                    }}>

                    {({ touched, errors }) =>
                       (
                        <div>
                          <Form>
                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-5">Please enter your login and password!</p>

                            <div className="form-outline form-white mb-4">
                              <label className="form-label" >Email</label>
                              <Field type="email" name="email" className={`mt-2 form-control form-control-lg ${touched.email && errors.email ? "is-invalid" : ""}`} />
                              <ErrorMessage component="div" name="email" className="invalid-feedback" />
                            </div>


                            <div className="form-outline form-white mb-4">
                              <label className="form-label" >Password</label>
                              <Field type="password" name='password' className={`mt-2 form-control form-control-lg ${touched.password && errors.password ? "is-invalid" : ""}`} />
                              <ErrorMessage component="div" name="password" className="invalid-feedback" />
                            </div>


                            <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                            <button className="btn text-dark btn-lg px-5 bg-white" type="submit">Login</button>

                          </Form>
                        </div>)}

                  </Formik>

                </div>

                <div>
                  <p className="mb-0">Don't have an account? <Link to="/register" className="text-white-50 fw-bold">Sign Up</Link>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login