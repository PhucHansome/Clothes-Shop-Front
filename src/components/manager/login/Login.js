import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../../service/auth/authService";
import '../../../assets/css/style.css'
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState({
    loading: false,
    user: {
      username: localStorage.getItem("registerUsername"),
      password: localStorage.getItem("registerPass"),
    },
  });

  let setCookie = (key, value) => {
    let expires = new Date();
    expires.setTime(expires.getTime() + expires * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
  };

  const handleChangeValue = (e) => {
    setState({
      ...state,
      user: {
        ...user,
        [e.target.name]: e.target.value,
      },
    });
  };

  let navigate = useNavigate();
  const doLogin = async () => {
    try {
      setState({ ...state, loading: true });
      if (user.username === "admin") {
        user.username = user.username + "@gg.cc";
      }
      let CustomerRest = await authService.login(user);
      setState({ ...state, loading: false });
      if (CustomerRest.data) {
        setCookie("JWT", CustomerRest.data.token);
        localStorage.setItem("username", CustomerRest.data.username);
        localStorage.removeItem("registerUsername")
        localStorage.removeItem("registerPass")
        toast.success("Login successs");
        navigate("/manager", { replace: true });
      }
    } catch (error) {
      setState({ ...state, loading: false });
      toast.error("Thao tác thất bại");
    }
  };

  if (localStorage.getItem('username')) {
    navigate("/manager", { replace: true });
  }
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
                    <Link to="index.html">
                      <span>
                        <img
                          src="assets\images\logo-light.png"
                          alt=""
                          height={26}
                        />
                      </span>
                    </Link>
                    <p className="text-muted mb-4 mt-3">
                      Enter your email address and password to access admin
                      panel.
                    </p>
                  </div>
                  <h5 className="auth-title">Sign In</h5>
                  <div className="form-group mb-3">
                    <label htmlFor="emailaddress">Email address</label>
                    <input
                      className="form-control"
                      name="username"
                      onInput={handleChangeValue}
                      type="email"
                      id="emailaddress"
                      value={user.username === null ? "" : user.username }
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      className="form-control"
                      name="password"
                      onInput={handleChangeValue}
                      type="password"
                      required
                      value={user.password === null ? "" : user.password}
                      id="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <div className="custom-control custom-checkbox checkbox-info">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="checkbox-signin"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="checkbox-signin"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="form-group mb-0 text-center">
                    <button
                      className="btn btn-danger btn-block"
                      onClick={doLogin}
                    >
                      {" "}
                      Log In{" "}
                    </button>
                  </div>
                  <div className="text-center">
                    <h5 className="mt-3 text-muted">Sign in with</h5>
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
                  <p>
                    {" "}
                    <Link to="pages-recoverpw.html" className="text-muted ml-1">
                      Forgot your password?
                    </Link>
                  </p>
                  <p className="text-muted">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-muted ml-1">
                      <b className="font-weight-semibold">Sign Up</b>
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
        <Link to className="text-muted">
          Coderthemes
        </Link>
      </footer>
      {/* Vendor js */}
      {/* App js */}
    </div>
  );
};

export default Login;
