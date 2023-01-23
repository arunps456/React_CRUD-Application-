import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { Link } from 'react-router-dom'
import axios from 'axios';

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(3, "Password must be 3 characters at minimum")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .min(3, "Password must be 3 characters at minimum")
        .required("Password is required")
        .when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same"
            )
        }),
    firstName: Yup.string()
        .min(3, "First name must be 3 characters at minimum")
        .required("First Name is required"),
    lastName: Yup.string()
        .min(1, "Last name must be 1 characters at minimum")
        .required("Last Name is required"),
});

const submitHandler = (values) => {
    axios.post('http://localhost:4000/user', {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password
    });
}


function Register() {
    return (
        <section className="vh-100 ">
            <div className="container py-3 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-2 mt-md-2 pb-5">
                                    <Formik
                                        initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
                                        validationSchema={RegisterSchema}
                                        onSubmit={(values) => submitHandler(values)}
                                    >
                                        {({ touched, errors, isSubmitting }) =>
                                            !isSubmitting ? (
                                                <div>
                                                    <h2 className="fw-bold mb-2 text-uppercase">Registration</h2>
                                                    <p className="text-white-50 mb-5">Please enter your details</p>
                                                    <Form>
                                                        <div className="form-outline form-white mb-4">
                                                            <label className="form-label" >First Name</label>
                                                            <Field type="text" name="firstName" className={`mt-2 form-control form-control-lg ${touched.firstName && errors.firstName ? "is-invalid" : ""}`} />
                                                            <ErrorMessage component="div" name="firstName" className="invalid-feedback" />
                                                        </div>

                                                        <div className="form-outline form-white mb-4">
                                                            <label className="form-label" >Last Name</label>
                                                            <Field type="text" name="lastName" className={`mt-2 form-control form-control-lg ${touched.lastName && errors.lastName ? "is-invalid" : ""}`} />
                                                            <ErrorMessage component="div" name="lastName" className="invalid-feedback" />
                                                        </div>

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

                                                        <div className="form-outline form-white mb-4">
                                                            <label className="form-label" >Confirm Password</label>
                                                            <Field type="password" name='confirmPassword' className={`mt-2 form-control form-control-lg ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""}`} />
                                                            <ErrorMessage component="div" name="confirmPassword" className="invalid-feedback" />
                                                        </div>

                                                        <button className="btn text-dark btn-lg px-5 bg-white" type="submit">Register</button>
                                                    </Form>
                                                </div>
                                            ) : (<div>
                                                <h1 className="p-3 mt-5">Successfuly Registered</h1></div>)}
                                    </Formik>
                                    <div>
                                        <p className="mb-0 mt-4">Already a user? <Link to="/" className="text-white-50 fw-bold">Login</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register