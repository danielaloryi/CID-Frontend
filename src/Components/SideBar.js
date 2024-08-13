import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import logo from "../Assets/logo.png";
import { selectUser } from '../Redux/Slices/UserSlice';
import { useSelector } from 'react-redux';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Modal } from 'antd';

const SideBar = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const location = useLocation();
    const handleClickRoute = (route) => {
        navigate(route);
    };

    const isActive = (route) => {
        return location.pathname === route;
    };

    return (
        <div className=' sticky z-50 top-0 h-screen bg-white shadow-sm'>
            <div className=' grid place-items-center pt-12'>
                <img className='' src={logo} style={{ width: 110, height: 110 }} />
            </div>
            <List style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 14 }}>
                <ListItemButton
                    selected={isActive("/dashboard")}
                    onClick={() => handleClickRoute("/dashboard")}
                    style={{
                        margin: 8,
                        paddingTop: 9,
                        paddingBottom: 9,
                        borderRadius: 5,
                        // backgroundColor: isActive("/dashboard") ? "#ECB22D" : "initial",

                    }}
                >
                    <ListItemIcon>


                        <svg color={isActive("/dashboard") ? "#1482F0" : "#5D6679"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>


                    </ListItemIcon>
                    <ListItemText
                        style={{ fontSize: 27 }}
                        className={
                            location.pathname === "/dashboard"
                                ? " text-[#1482F0] font-bold"
                                : "text-[14px] text-[#9299A6] font-bold"
                        }
                        // className=" text-[14px] text-[#9299A6]"
                        // style={{ fontWeight: "bold" }}
                        primary="Dashboard"
                    // Manage Done Assigning
                    />
                </ListItemButton>

                <ListItemButton
                    selected={isActive("/inventory")}
                    onClick={() => handleClickRoute("/inventory")}
                    style={{
                        margin: 8,
                        paddingTop: 9,
                        paddingBottom: 9,
                        borderRadius: 5,
                        // backgroundColor: isActive("/dashboard") ? "#ECB22D" : "initial",

                    }}
                >
                    <ListItemIcon>

                        <svg color={isActive("/inventory") ? "#1482F0" : "#5D6679"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                        </svg>


                    </ListItemIcon>
                    <ListItemText
                        style={{ fontSize: 27 }}
                        className={
                            location.pathname === "/inventory"
                                ? " text-[#1482F0] font-bold"
                                : "text-[14px] text-[#9299A6] font-bold"
                        }
                        // className=" text-[14px] text-[#9299A6]"
                        // style={{ fontWeight: "bold" }}
                        primary="Inventory"
                    // Manage Done Assigning
                    />
                </ListItemButton>

                {
                    user.user_type === "User" ? null : <ListItemButton
                        selected={isActive("/users")}
                        onClick={() => handleClickRoute("/users")}
                        style={{
                            margin: 8,
                            paddingTop: 9,
                            paddingBottom: 9,
                            borderRadius: 5,
                            // backgroundColor: isActive("/dashboard") ? "#ECB22D" : "initial",

                        }}
                    >
                        <ListItemIcon>

                            <svg color={isActive("/users") ? "#1482F0" : "#5D6679"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>






                        </ListItemIcon>
                        <ListItemText
                            style={{ fontSize: 27 }}
                            className={
                                location.pathname === "/users"
                                    ? " text-[#1482F0] font-bold"
                                    : "text-[14px] text-[#9299A6] font-bold"
                            }
                            // className=" text-[14px] text-[#9299A6]"
                            // style={{ fontWeight: "bold" }}
                            primary="Users"
                        // Manage Done Assigning
                        />
                    </ListItemButton>
                }





            </List>
            <div className='absolute bottom-0 left-0 right-0 pb-10 pl-10'>
                <Button startIcon={<LogoutOutlinedIcon />} onClick={() => {
                    Modal.warning({
                        content: "Are you sure you want to logout?",
                        onOk: () => {
                            navigate("/")
                        },
                        okType: "dashed"
                    })
                }}>LOGOUT</Button>
            </div>

        </div>
    )
}

export default SideBar;