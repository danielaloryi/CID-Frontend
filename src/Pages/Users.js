import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar';
import { Avatar, Button, TextField, Tooltip } from '@mui/material';
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    IconButton,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Modal, message } from "antd";
import Password from 'antd/es/input/Password';
import axios from "axios";
import BASEURL from '../Connection/Connection';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slices/UserSlice';

const Users = () => {
    const user = useSelector(selectUser);
    const Ranks = [
        "Inspector General Police",
        "Deputy Inspector General",
        "Commissioner",
        "Deputy Commissioner",
        "Assistant Commissioner",
        "Chief Superintendent",
        "Superintendent",
        "Assistant Superintendent",
        "Chief Inspector",
        "Inspector",
        "Sergeant",
        "Corporal",
        "Lance Corporal",
        "Constable"
    ]
    const navigate = useNavigate();
    const [open_Modal, setopen_Modal] = useState(false);
    const [UserLoader, setUserLoader] = useState(false);

    const [page, setPage] = React.useState(0);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const Users = ["User", "Admin"];
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [user_type, setuser_type] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [rank, setrank] = useState("");


    const [All_Users, setAll_Users] = useState([]);

    const Submit_Users = () => {
        setUserLoader(true);

        const payload = {
            fname,
            lname,
            user_type,
            username,
            password,
            rank
        }

        axios.post(`${BASEURL}/users/create-account`, payload).then((response) => {
            const data = response.data;
            setUserLoader(false);
            if (data) {
                message.success("User Added Successfully!!");
                setopen_Modal(false)
                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    useEffect(() => {
        axios.get(`${BASEURL}/users/all_users`).then((response) => {
            const data = response.data;
            setAll_Users(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const [searchvalue, setsearchvalue] = useState("")
    const filteredcustomers = All_Users.filter((customer) => {
        const customerName = (customer.fname).toLowerCase();
        return customerName.includes(searchvalue.toLowerCase());
    });

    filteredcustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);



    return (
        <>
            <Modal onCancel={() => {
                setopen_Modal(false);
            }} footer={null} title={<h1 className=' text-center'>Add User</h1>} open={open_Modal}>
                <div className=' pt-5 space-y-6'>

                    <TextField value={fname} onChange={(e) => {
                        setfname(e.target.value);
                    }} label="First Name" fullWidth />
                    <TextField value={lname} onChange={(e) => {
                        setlname(e.target.value);
                    }} label="Last Name" fullWidth />
                    <TextField value={username} onChange={(e) => {
                        setusername(e.target.value);
                    }} label="Username" fullWidth />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Rank</InputLabel>
                        <Select
                            label="Select Rank"
                            labelId="demo-simple-select-label"
                            value={rank}
                            onChange={(e) => {
                                setrank(e.target.value);
                            }}>
                            {Ranks.map((count) => (
                                <MenuItem key={count} value={count}>
                                    {count}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                        <Select
                            label="Select Rank"
                            labelId="demo-simple-select-label"
                            value={user_type}
                            onChange={(e) => {
                                setuser_type(e.target.value);
                            }}>
                            {Users.map((count) => (
                                <MenuItem key={count} value={count}>
                                    {count}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField value={password} onChange={(e) => {
                        setpassword(e.target.value);
                    }} label="Password" fullWidth />
                    {UserLoader ? <Button style={{ width: "100%", backgroundColor: "#1482F0", color: "white", padding: 10 }}> <CircularProgress size={17} style={{ color: "white" }} /></Button> :
                        <Button onClick={Submit_Users} style={{ width: "100%", backgroundColor: "#1482F0", color: "white", padding: 12 }}>Save</Button>}
                </div>
            </Modal>

            <div className=' grid grid-cols-10'>
                <div className=' col-span-2'>
                    <SideBar />
                </div>
                <div className=' col-span-8 bg-[#F0F1F3] px-4'>
                    <div>
                        <div className=' flex items-center justify-between bg-white p-4 shadow rounded-[4px] mt-9'>
                            <TextField value={searchvalue} onChange={(e) => {
                                setsearchvalue(e.target.value)
                            }} label="Search" style={{ width: "90%" }} />
                            <div className=' flex items-center space-x-3'>
                                <Button>Filters</Button>
                                <Avatar style={{ width: 40, height: 40, backgroundColor: "#1482F0", textTransform: "uppercase" }}>{user?.username[0]}</Avatar>
                            </div>
                        </div>

                        <div className=' my-16'>
                            <TableContainer
                                elevation={3}
                                component={Paper}
                                style={{ borderRadius: 10 }}
                            >
                                <div className=' flex items-center justify-between px-5 py-8'>
                                    <h1 className=' text-xl'>Users</h1>
                                    <Button onClick={() => {
                                        setopen_Modal(true);
                                    }} className=' px-10' style={{ backgroundColor: "#1482F0", color: "white", textTransform: "initial", paddingLeft: 12, paddingRight: 12 }}>Add User</Button>
                                </div>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    fontFamily: "'Poppins', sans-serif",
                                                    paddingLeft: 21,
                                                }}
                                            >
                                                First Name
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    fontFamily: "'Poppins', sans-serif",
                                                }}
                                            >
                                                Last Name
                                            </TableCell>

                                            <TableCell
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    fontFamily: "'Poppins', sans-serif",
                                                }}
                                            >
                                                Username
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    fontFamily: "'Poppins', sans-serif",
                                                }}
                                            >
                                                Rank
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    fontFamily: "'Poppins', sans-serif",
                                                }}
                                            >
                                                Actions
                                            </TableCell>


                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {
                                            filteredcustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                return (
                                                    <TableRow key={row.studentid}>
                                                        <TableCell
                                                            style={{
                                                                fontFamily: "'Poppins', sans-serif",
                                                                paddingLeft: 21,
                                                            }}
                                                        >
                                                            {row.fname}
                                                        </TableCell>


                                                        <TableCell
                                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                                        >
                                                            {row.lname}
                                                        </TableCell>

                                                        <TableCell
                                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                                        >
                                                            {row.username}
                                                        </TableCell>

                                                        <TableCell
                                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                                        >
                                                            {row.rank}
                                                        </TableCell>

                                                        <TableCell
                                                            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold", color: "green", textTransform: "uppercase" }}
                                                        >
                                                            <IconButton onClick={
                                                                () => {
                                                                    Modal.warning({
                                                                        content: "Are you sure you want to delete?",
                                                                        closable: true,
                                                                        okType: "dashed",
                                                                        onOk: () => {
                                                                            axios.delete(`${BASEURL}/users/${row.tblid}`).then((response) => {
                                                                                const data = response.data;
                                                                                if (data) {
                                                                                    message.success("User Deleted Successfully!!")
                                                                                    window.location.reload();
                                                                                }

                                                                            }).catch((err) => {
                                                                                console.log(err);
                                                                            })
                                                                        }
                                                                    });
                                                                }
                                                            }>
                                                                {/* <Tooltip title="Delete User"> */}
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>

                                                                {/* </Tooltip> */}
                                                            </IconButton>
                                                        </TableCell>

                                                        {/* <TableCell
                                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                                    >
                                                        <Button onClick={() => {
                                                            navigate("/view-profile", {
                                                                state: {
                                                                    id: row.id
                                                                }
                                                            });
                                                        }} style={{ backgroundColor: "#E06126", color: "white", paddingLeft: 15, paddingRight: 15 }}>View Profile</Button>
                                                    </TableCell> */}

                                                    </TableRow>
                                                );
                                            })



                                        }

                                    </TableBody>
                                </Table>
                                <TablePagination
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={All_Users.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableContainer>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Users;