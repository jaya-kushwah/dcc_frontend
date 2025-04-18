import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import '../assets/Style/Signup.css'

function Signup() {
    const navigate = useNavigate();
    const [userName, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!userName) {
            toast.error("please enter userName");
        } else if (!email) {
            toast.error("please enter email");
        } else if (!emailRegex.test(email)) {
            toast.error("please enter valid email");
        } else if (!password) {
            toast.error("please enter password");
        } else {
            axios.post("http://localhost:5000/user/add", {
                userName: userName,
                email: email,
                password: password,
            })
                .then(async (res) => {
                    if (res.status === 201) {
                        toast.success("Signup successfull")

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
                <h1>Signup</h1>
            </div>
            <div className="form-group" >
                <label>UserName</label>
                <input type="userName" placeholder="Enter UserName" value={userName}
                    onChange={(e) => setuserName(e.target.value)} />
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
            <button className="submit-btn" onClick={handleSignup}>Submit</button>
            <div className="signup-link">
                already have an account ! <Link to="/" >Login</Link>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default Signup;
