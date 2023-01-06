/* eslint-disable no-undef */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../../service/auth/authService";
import '../../../assets/css/style.css'

const Login = () => {
  const [state, setState] = useState({
    loading: false,
    user: {
      id: "0",
      username: "",
      password: "",
      role: {
        id: "",
      },
    },
  });
  const [password, setPassword] = useState({
    passwordConfirm : ""
  })

  localStorage.removeItem("registerUsername");
  localStorage.removeItem("registerPass");

  const handleChange = (e) => {
    setState({
      ...state,
      user: {
        ...user,
        [e.target.name]: e.target.value,
      },
    });
    setPassword({...password,  passwordConfirm : e.target.value})
  };

  let navigate = useNavigate();

  const doRegister = async () => {
    let role = {};
    role.id = 1;
    user.role = role;
    if(password.passwordConfirm !== user.password){
      toast.error("Password Incorrect!");
      return
    }
    try {
      setState({ ...state, loading: true });
      let CustomerRest = await authService.register(user);
      setState({ ...state, loading: false });
      
      if (CustomerRest.data) {
        toast.success("Register Success");
        navigate("/manager/login", { replace: true });
        localStorage.setItem("registerUsername", user.username);
        localStorage.setItem("registerPass", user.password);
      }
    } catch (error) {
      setState({ ...state, loading: false });
      toast.error("Thao tác thất bại");
    }
  };

 

  const { user } = state;
  return (
    <div>
      <div className="account-pages mt-5 mb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card">
                <div className="card-body p-4">
                  <div className="text-center w-75 m-auto">
                    <Link href="index.html">
                      <span>
                        <img
                          src="..\..\assets\images\logo-light.png"
                          alt=""
                          height={26}
                        />
                      </span>
                    </Link>
                    <p className="text-muted mb-4 mt-3">
                      Don't have an account? Create your free account now.
                    </p>
                  </div>
                  <h5 className="auth-title">Create Account</h5>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      className="form-control"
                      type="email"
                      id="emailaddress"
                      required
                      onChange={handleChange}
                      name="username"
                      placeHolder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      className="form-control"
                      type="password"
                      onChange={handleChange}
                      name="password"
                      required
                      id="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password Confirm</label>
                    <input
                      className="form-control"
                      type="password"
                      onChange={handleChange}
                      name="passwordConfirm"
                      required
                      id="passwordConfirm"
                      placeholder="Enter your password Confirm"
                    />
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox checkbox-info">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="checkbox-signup"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="checkbox-signup"
                      >
                        I accept
                        <Link to="#" className="text-dark">
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                  </div>
                  <div className="form-group mb-0 text-center">
                    <button
                      className="btn btn-danger btn-block"
                      onClick={doRegister}
                      // type="submit"
                    >
                      {" "}
                      Sign Up{" "}
                    </button>
                  </div>
                  <div className="text-center">
                    <h5 className="mt-3 text-muted">Sign up using</h5>
                    <ul className="social-list list-inline mt-3 mb-0">
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="social-list-item border-primary text-primary"
                        >
                          <i className="mdi mdi-facebook" />
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="social-list-item border-danger text-danger"
                        >
                          <i className="mdi mdi-google" />
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="social-list-item border-info text-info"
                        >
                          <i className="mdi mdi-twitter" />
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="social-list-item border-secondary text-secondary"
                        >
                          <i className="mdi mdi-github-circle" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>{" "}
                {/* end card-body */}
              </div>
              {/* end card */}
              <div className="row mt-3">
                <div className="col-12 text-center">
                  <p className="text-muted">
                    Already have account?{" "}
                    <Link to="/manager/login" className="text-muted ml-1">
                      <b className="font-weight-semibold">Sign In</b>
                    </Link>
                  </p>
                </div>{" "}
                {/* end col */}
              </div>
              {/* end row */}
            </div>{" "}
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* end page */}
      <footer className="footer footer-alt">
        2019 © Upvex theme by{" "}
        <a href className="text-muted">
          Coderthemes
        </a>
      </footer>
      {/* Vendor js */}
      {/* App js */}
    </div>
  );
};

export default Login;
