import React, { useState } from 'react';
import logo from "../Assets/logo.png";
import { Button, CircularProgress, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASEURL from '../Connection/Connection';
import { useDispatch } from "react-redux";
import { Add_User } from '../Redux/Slices/UserSlice';
import { message } from 'antd';


const Login = () => {
    const navigate = useNavigate();
    const [user_loading, setuser_loading] = useState(false);
    const dispatch = useDispatch()
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const Submit_user = () => {
        if (!username && !password) {
            message.warning("All fields are required!!")
        }
        else {
            setuser_loading(true);
            const payload = {
                username,
                password
            }

            axios.post(`${BASEURL}/users/login`, payload).then((response) => {
                setuser_loading(false);
                const data = response.data.user;
                dispatch(Add_User({
                    user_type: data.user_type,
                    rank: data.rank,
                    username: data.username
                }))

                setuser_loading(false);
                if (data) {
                    navigate("/dashboard");
                }
            }).catch((err) => {
                console.log(err);
                setuser_loading(false);
                message.warning(err.response.data.message);
            })
        }

    }


    return (
        <div className=' grid place-items-center h-screen'>
            <div>
                <div className=' grid place-items-center'>
                    <img src={logo} style={{ width: 150, height: 150 }} />
                </div>
                <div className=' space-y-4'>
                    <h1 className=' font-bold text-2xl text-center pt-4'>Forensic Inventory System</h1>
                    <p className=' text-base text-center '>Please enter your details</p>
                </div>
                <div className=' space-y-6 pt-5'>
                    <TextField value={username} onChange={(e) => {
                        setusername(e.target.value);
                    }} label="Username" fullWidth />
                    <TextField type="password" value={password} onChange={(e) => {
                        setpassword(e.target.value);
                    }} label="Password" fullWidth />
                </div>

                {/* <h1 onClick={() => {
                    navigate("/forget-password")
                }} className=' cursor-pointer text-base text-center py-5 text-[#1482F0]'>Forget Password?</h1> */}

                {user_loading ? <Button onClick={() => {
                    navigate("/dashboard");
                }} style={{ width: "100%", backgroundColor: "#1482F0", color: "white", padding: 13,marginTop:20 }}> <CircularProgress size={17} style={{ color: "white" }} /></Button> :
                    <Button onClick={Submit_user} style={{ width: "100%", backgroundColor: "#1482F0", color: "white", padding: 13,marginTop:20, textTransform:"initial" }}>Sign In</Button>}
            </div>
        </div>
    )
}

export default Login;