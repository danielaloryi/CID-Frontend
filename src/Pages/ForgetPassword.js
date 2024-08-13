import React, { useState } from 'react';
import logo from "../Assets/logo.png";
import { Button, CircularProgress, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASEURL from '../Connection/Connection';
import { message } from 'antd';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [user_loading, setuser_loading] = useState(false);

    const Submit = () => {
        setuser_loading(true);
        if (!username && !newpassword) {
            message.warning("Fields are required!!");
        } else {
            const payload = {
                password: newpassword
            }
            axios.put(`${BASEURL}/users/forgot_password/${username}`, payload).then((response) => {
                setuser_loading(false);
                const data = response.data;
                if (data) {
                    navigate("/");
                    message.success("Password Changed Successfully!!")
                }
            }).catch((err) => {
                setuser_loading(true);
                message.warning(err.response.data.message);
            })
        }


    }
    return (
        <div>
            <div className=' grid place-items-center h-screen'>
                <div className=' grid place-items-center'>
                    <img onClick={() => {
                        navigate("/");
                    }} src={logo} style={{ width: 150, height: 150 }} />
                    <div className=' space-y-4'>
                        <h1 className=' font-bold text-2xl text-center pt-4'>Forensic Inventry System</h1>
                        <p className=' text-base text-center '>Password Reset</p>
                    </div>
                    <div className=' space-y-6 pt-5'>
                        <TextField value={username} onChange={(e) => {
                            setusername(e.target.value);
                        }} label="Username" fullWidth />
                        <TextField value={newpassword} onChange={(e) => {
                            setnewpassword(e.target.value);
                        }} label="New Password" fullWidth />

                        {user_loading ? <Button onClick={() => {
                            navigate("/dashboard");
                        }} style={{ width: "100%", backgroundColor: "#1482F0", color: "white", padding: 13 }}> <CircularProgress size={17} style={{ color: "white" }} /></Button> :
                            <Button onClick={Submit} style={{ width: "100%", backgroundColor: "#1482F0", color: "white", padding: 13 }}>Submit</Button>}
                    </div>


                </div>
            </div>

        </div>
    )
}

export default ForgetPassword;