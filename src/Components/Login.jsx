import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Cookies } from 'react-cookie';
import '../assets/Style/Signup.css'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies();

    const handleLogin = (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            toast.error("please enter email");
       // }
       //  else if (!emailRegex.test(email)) {
       //     toast.error("please enter valid email");
        } else if (!password) {
           toast.error("please enter password");
        } else {
            axios.post("http://localhost:8080/public/login", {
                email: email,
                password: password,
            })
                .then(async (res) => {
                    if (res.status === 200) {
                        cookies.set('token', res.data.token, { path: '/' })
                        toast.success(res.data.message)

                        setTimeout(() => {
                            navigate("/");
                        }, 1000);
                    } else {
                        console.log("some error");
                        toast.error(res.data.message)
                    }
                })
                .catch(async (error) => {
                    console.log(error);
                    toast.error("An error occured . please try again later")
                })
        }
    };


    return (
        <div className="Signup-container mt-1">
            <div className="form-header">
                <h1>Login</h1>
            </div>
            <div className="form-group" >
                <label>Email </label>
                <input type="email" placeholder="Enter email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label >Password</label>
                <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="submit-btn" onClick={handleLogin}>Submit</button>
            <div className="signup-link">
                don't have an account ! <Link to="/signup" >Signup</Link>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default Login;
