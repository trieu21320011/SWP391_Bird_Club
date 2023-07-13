import React from "react";
import { Link } from "react-router-dom";
import { baseURL } from "./baseUrl";

import AuthImage from "../images/auth-image.jpg";
import AuthDecoration from "../images/auth-decoration.png";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigateTo = useNavigate();

  const onSignup = (e) => {
    e.preventDefault();
    console.log(e);
    const email = e.target.email.value;
    const password = e.target.password.value;

    Swal.fire({
      title: "Loading",
      html: "This will close in a minutes",

      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
      },
    });
    var data = JSON.stringify({
      email: email,
      password: password,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: baseURL + "/auth",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        localStorage.setItem("accessToken", response.data.jwtToken);
        localStorage.setItem("name", response.data.displayName);
        localStorage.setItem("role", response.data.userType);
        localStorage.setItem("uid", response.data.userId);
        Swal.close();
        Swal.fire("Good job!", "You login susccess!", "success");
        return response.data;
      })
      .then((res) => {
        var config = {
          method: "get",
          maxBodyLength: Infinity,
          url: baseURL + "/members/" + res.userId,
        };
        axios(config).then((response) => {
          console.log(response);
          localStorage.setItem("infor", JSON.stringify(response.data));
        });
      })
      .then(() => {
        navigateTo("/");
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        var message = error.response.data.message;
        Swal.close();
        Swal.fire("Oops", message, "error");
      });
  };
  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient
                        x1="28.538%"
                        y1="20.229%"
                        x2="100%"
                        y2="108.156%"
                        id="logo-a"
                      >
                        <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                        <stop stopColor="#A5B4FC" offset="100%" />
                      </linearGradient>
                      <linearGradient
                        x1="88.638%"
                        y1="29.267%"
                        x2="22.42%"
                        y2="100%"
                        id="logo-b"
                      >
                        <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                        <stop stopColor="#38BDF8" offset="100%" />
                      </linearGradient>
                    </defs>
                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                    <path
                      d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                      fill="#4F46E5"
                    />
                    <path
                      d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                      fill="url(#logo-a)"
                    />
                    <path
                      d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                      fill="url(#logo-b)"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">
                Welcome back! ✨
              </h1>
              {/* Form */}
              <form onSubmit={(e) => onSignup(e)}>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      className="form-input w-full"
                      type="email"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="form-input w-full"
                      type="password"
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link
                      className="text-sm underline hover:no-underline"
                      to="/reset-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200">
                <div className="text-sm">
                  Don’t you have an account?{" "}
                  <Link
                    className="font-medium text-indigo-500 hover:text-indigo-600"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
                <div className="text-sm pt-1">
                  Not verified account yet?{" "}
                  <a
                    className="font-medium text-indigo-500 hover:text-indigo-600 hover:cursor-pointer"
                    onClick={() => {
                      var email = document.getElementById("email").value;
                      if (!email) return;
                      var config = {
                        method: "post",
                        maxBodyLength: Infinity,
                        url: baseURL + "/auth/resend-email?email=" + email,
                        headers: {
                          "Content-Type": "application/json",
                        },
                      };
                      axios(config)
                        .then((response) => {
                          Swal.fire(
                            "Good job!",
                            "Send verification success!",
                            "success"
                          );
                        })
                        .catch((error) => {
                          Swal.close();
                          Swal.fire("Oops", "Something when wrong", "error");
                        });
                    }}
                  >
                    Verify
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
          aria-hidden="true"
        >
          <img
            className="object-cover object-center w-full h-full"
            src={AuthImage}
            width="760"
            height="1024"
            alt="Authentication"
          />
        </div>
      </div>
    </main>
  );
}

export default Signin;
