import React, { useEffect, useState } from 'react';
import SideBar from '../Components/SideBar';
import { Avatar, Button, TextField } from '@mui/material';
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Modal, message, DatePicker } from 'antd';
import dayjs from "dayjs";
import axios from 'axios';
import BASEURL from '../Connection/Connection';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slices/UserSlice';

const Inventory = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [open_Modal, setopen_Modal] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const [date__, setdate__] = useState(null);
    const [case_title, setcase_title] = useState("");
    const [examiners, setexaminers] = useState("");
    const [status, setstatus] = useState("");
    const [device_type, setdevice_type] = useState("");
    const [device_name, setdevice_name] = useState("");
    const [device_serial_number, setdevice_serial_number] = useState("");
    const [description, setdescription] = useState("");
    const [submit_loading, setsubmit_loading] = useState(false);
    const [exhibit_devices, setexhibit_devices] = useState("");
    const [court_order_number, setcourt_order_number] = useState("");
    const [additional_information, setadditional_information] = useState("");

    const Submit = () => {
        setsubmit_loading(true);

        const payload = {
            status,
            date: date__,
            case_title,
            examiners,
            device_type,
            device_name,
            device_serial_number,
            description,
            exhibit_devices,
            court_order_number,
            additional_information
        }
        axios.post(`${BASEURL}/cases/add_case`, payload).then((response) => {
            setsubmit_loading(false);
            const data = response.data;
            if (data) {
                message.success("Cases Added Successfully!!");
                setopen_Modal(false);
                window.location.reload();
            }

        }).catch((err) => {
            setsubmit_loading(false);
            console.log(err);
        })
    }

    const [All_Inventory, setAll_Inventory] = useState([]);

    useEffect(() => {
        axios.get(`${BASEURL}/cases/all_cases`).then((response) => {
            const data = response.data;
            setAll_Inventory(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const [searchvalue, setsearchvalue] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const filteredcustomers = All_Inventory.filter((customer) => {
        const customerName = (customer.case_id).toLowerCase();
        const matchesSearch = customerName.includes(searchvalue.toLowerCase());
        const matchesStatus = statusFilter ? customer.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    filteredcustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    const [All_Users, setAll_Users] = useState([]);

    useEffect(() => {
        axios.get(`${BASEURL}/users/all_users`).then((response) => {
            const data = response.data;
            setAll_Users(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    const [numberOfInputs, setNumberOfInputs] = useState(0);
    const [inputValues, setInputValues] = useState([]);

    const handleNumberChange = (event) => {
        const number = event.target.value;
        setNumberOfInputs(number);
        setInputValues(Array(number * 3).fill(""));
    };

    const handleInputChange = (index, event) => {
        const values = [...inputValues];
        values[index] = event.target.value;
        setInputValues(values);
    };


    return (
        <>
            <Modal width={900} footer={null} title={<h1 className='text-center'>Add New Case</h1>} onCancel={() => {
                setopen_Modal(false);
            }} open={open_Modal}>
                <div className=' py-4 space-y-5'>
                    <div className=' grid grid-cols-2 gap-5'>
                        <div className=' space-y-6'>
                            <TextField value={case_title} onChange={(e) => {
                                setcase_title(e.target.value);
                            }} label="Case Title" fullWidth />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Examiners</InputLabel>
                                <Select
                                    label="Number of Members"
                                    labelId="demo-simple-select-label"
                                    value={examiners}
                                    onChange={(e) => {
                                        setexaminers(e.target.value);
                                    }}
                                >
                                    {All_Users.map((count) => (
                                        <MenuItem key={count} value={`${count.fname} ${count.lname} - ${count.rank}`}>
                                            {count.fname}  {count.lname} - {count.rank}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </div>
                        <div className=' space-y-6'>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    label="Number of Members"
                                    labelId="demo-simple-select-label"
                                    value={status}
                                    onChange={(e) => {
                                        setstatus(e.target.value);
                                    }}
                                >
                                    {["Completed", "In Progress Case"].map((count) => (
                                        <MenuItem key={count} value={count}>
                                            {count}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField multiline={4} value={court_order_number} onChange={(e) => {
                                setcourt_order_number(e.target.value);
                            }} label="Court Order Number" fullWidth />
                        </div>
                    </div>
                    <DatePicker placeholder='date' className=' py-4' style={{ width: "100%" }} value={date__} onChange={(e) => {
                        setdate__(e);
                    }} />
                    <TextField multiline={5} value={additional_information} onChange={(e) => {
                        setadditional_information(e.target.value);
                    }} label="Additional Information" fullWidth />

                    <div>
                        {Array.from({ length: numberOfInputs }, (_, i) => (
                            <div key={i}>
                                <TextField
                                    label={`Device Name ${i + 1}`}
                                    value={inputValues[i * 3] || ""}
                                    onChange={(event) => handleInputChange(i * 3, event)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label={`Serial Number ${i + 1}`}
                                    value={inputValues[i * 3 + 1] || ""}
                                    onChange={(event) => handleInputChange(i * 3 + 1, event)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label={`Description ${i + 1}`}
                                    value={inputValues[i * 3 + 2] || ""}
                                    onChange={(event) => handleInputChange(i * 3 + 2, event)}
                                    fullWidth
                                    margin="normal"
                                />
                            </div>
                        ))}
                    </div>

                </div>
                {submit_loading ? <Button style={{ width: "100%", backgroundColor: "#1482F0", color: "white", padding: 13, textTransform: "initial" }}> <CircularProgress size={17} style={{ color: "white" }} /></Button> :
                    <Button onClick={Submit} style={{ width: "100%", backgroundColor: "#1482F0", color: "white", padding: 13, textTransform: "initial" }}>Assign Case</Button>}
            </Modal>

            <div className=' grid grid-cols-10'>
                <div className=' col-span-2'>
                    <SideBar />
                </div>
                <div className=' col-span-8 bg-[#F0F1F3] px-4'>
                    <div>
                        <div className=' flex items-center justify-between bg-white p-4 shadow rounded-[4px] mt-9'>
                            <TextField value={searchvalue} onChange={(e) => {
                                setsearchvalue(e.target.value);
                            }} label="Search" style={{ width: "80%", paddingRight: 20 }} />
                            <FormControl style={{ width: "20%" }}>
                                <InputLabel id="status-filter-select-label">Filter by Status</InputLabel>
                                <Select
                                    labelId="status-filter-select-label"
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                    }}
                                    label="Filter by Status"
                                >
                                    <MenuItem value=""><em>All Cases</em></MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                    <MenuItem value="In Progress Case">In Progress Case</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className=' flex items-center justify-between my-8'>
                            <div>
                                <h1 className=' font-extrabold text-xl'>Inventory</h1>
                                <p className=' text-sm'>Overview of all Inventory</p>
                            </div>
                            <div className=' flex items-center space-x-4'>
                                <Button onClick={() => {
                                    setopen_Modal(true);
                                }} style={{ backgroundColor: "#1482F0", color: "white", paddingLeft: 20, textTransform: "initial", fontSize: 14, paddingRight: 20 }}>Assign New Case</Button>
                            </div>
                        </div>
                    </div>

                    <div className=' p-2 bg-white rounded-[4px] shadow-sm'>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Case ID</TableCell>
                                        <TableCell>Case Title</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Members</TableCell>
                                        <TableCell>Created At</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredcustomers.map((customer, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{customer.case_id}</TableCell>
                                            <TableCell>{customer.case_title}</TableCell>
                                            <TableCell>{customer.status}</TableCell>
                                            <TableCell>{customer.examiners}</TableCell>
                                            <TableCell>{dayjs(customer.createdAt).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => {
                                                        navigate("/details",
                                                            {
                                                                state: {
                                                                    case_id: customer.case_id,
                                                                    case_title: customer.case_title,
                                                                    examiners: customer.examiners,
                                                                    date: customer.date,
                                                                    status: customer.status,
                                                                    device_type: customer.device_type,
                                                                    device_name: customer.device_name,
                                                                    device_serial_number: customer.device_serial_number,
                                                                    description: customer.description,
                                                                    exhibit_devices: customer.exhibit_devices,
                                                                    court_order_number: customer.court_order_number,
                                                                    tblid: customer.tblid
                                                                }
                                                            }
                                                        );
                                                    }}

                                                    style={{ color: "white", backgroundColor: "#1482F0", fontSize: 14, textTransform: "initial", paddingLeft: 10, paddingRight: 10 }}
                                                >See Details</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 10, 25]}
                            page={page}
                            onPageChange={(e, newPage) => handleChangePage(newPage)}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            count={filteredcustomers.length}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Inventory;



// import React, { useEffect, useState } from 'react'
// import SideBar from '../Components/SideBar';
// import { Avatar, Button, TextField } from '@mui/material';
// import {
//     CircularProgress,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     TablePagination,
//     IconButton,
//     InputAdornment,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem
// } from "@mui/material";
// import { useNavigate } from 'react-router-dom';
// import { Modal, message, DatePicker } from 'antd';
// import dayjs from "dayjs";
// import axios from 'axios';
// import BASEURL from '../Connection/Connection';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../Redux/Slices/UserSlice';

// const Inventory = () => {
//     const user = useSelector(selectUser);
//     const navigate = useNavigate();
//     const [open_Modal, setopen_Modal] = useState(false);

//     const [page, setPage] = React.useState(0);

//     const handleChangePage = (newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (e) => {
//         setRowsPerPage(parseInt(e.target.value, 10));
//         setPage(0);
//     };

//     const [rowsPerPage, setRowsPerPage] = React.useState(10);


//     const [date__, setdate__] = useState(null);
//     const [case_title, setcase_title] = useState("");
//     const [examiners, setexaminers] = useState("");
//     const [status, setstatus] = useState("");
//     const [device_type, setdevice_type] = useState("");
//     const [device_name, setdevice_name] = useState("");
//     const [device_serial_number, setdevice_serial_number] = useState("");
//     const [description, setdescription] = useState("");
//     const [submit_loading, setsubmit_loading] = useState(false);
//     const [exhibit_devices, setexhibit_devices] = useState("");
//     const [court_order_number, setcourt_order_number] = useState("");
//     const [additional_information, setadditional_information] = useState("");


//     const Submit = () => {
//         setsubmit_loading(true);


//         const payload = {
//             status,
//             date: date__,
//             case_title,
//             examiners,
//             device_type,
//             device_name,
//             device_serial_number,
//             description,
//             exhibit_devices,
//             court_order_number,
//             additional_information
//         }
//         axios.post(`${BASEURL}/cases/add_case`, payload).then((response) => {
//             setsubmit_loading(false);
//             const data = response.data;
//             if (data) {
//                 message.success("Cases Added Successfully!!");
//                 setopen_Modal(false);
//                 window.location.reload();
//             }

//         }).catch((err) => {
//             setsubmit_loading(false);
//             console.log(err);
//         })
//     }


//     const [All_Inventory, setAll_Inventory] = useState([]);

//     useEffect(() => {
//         axios.get(`${BASEURL}/cases/all_cases`).then((response) => {
//             const data = response.data;
//             setAll_Inventory(data);
//         }).catch((err) => {
//             console.log(err);
//         })

//     }, []);

//     const [searchvalue, setsearchvalue] = useState("")
//     const filteredcustomers = All_Inventory.filter((customer) => {
//         const customerName = (customer.case_id).toLowerCase();
//         return customerName.includes(searchvalue.toLowerCase());
//     });

//     filteredcustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);




//     return (
//         <>
//             <Modal width={900} footer={null} title={<h1 className='text-center'>Add New Case</h1>} onCancel={() => {
//                 setopen_Modal(false);
//             }} open={open_Modal}>
//                 <div className=' py-4 space-y-5'>
//                     <div className=' grid grid-cols-2 gap-5'>
//                         <div className=' space-y-6'>
//                             <TextField value={case_title} onChange={(e) => {
//                                 setcase_title(e.target.value);
//                             }} label="Case Title" fullWidth />
//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Examiners</InputLabel>
//                                 <Select
//                                     label="Number of Members"
//                                     labelId="demo-simple-select-label"
//                                     value={examiners}
//                                     onChange={(e) => {
//                                         setexaminers(e.target.value);
//                                     }}
//                                 >
//                                     {["inspectors", "detectives"].map((count) => (
//                                         <MenuItem key={count} value={count}>
//                                             {count}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                             <DatePicker placeholder='date' className=' py-4' style={{ width: "100%" }} value={date__} onChange={(e) => {
//                                 setdate__(e);
//                             }} />
//                             <TextField value={device_type} onChange={(e) => {
//                                 setdevice_type(e.target.value);
//                             }} label="Device Type" fullWidth />

//                             <TextField multiline={4} value={exhibit_devices} onChange={(e) => {
//                                 setexhibit_devices(e.target.value);
//                             }} label="Exhibit Devices" fullWidth />
//                         </div>
//                         <div className=' space-y-6'>

//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Status</InputLabel>
//                                 <Select
//                                     label="Number of Members"
//                                     labelId="demo-simple-select-label"
//                                     value={status}
//                                     onChange={(e) => {
//                                         setstatus(e.target.value);
//                                     }}
//                                 >
//                                     {["Completed", "In Progress Case"].map((count) => (
//                                         <MenuItem key={count} value={count}>
//                                             {count}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>

//                             <TextField value={device_name} onChange={(e) => {
//                                 setdevice_name(e.target.value);
//                             }} label="Device Name" fullWidth />

//                             <TextField value={device_serial_number} onChange={(e) => {
//                                 setdevice_serial_number(e.target.value);
//                             }} label="Device Serial Number" fullWidth />

//                             <TextField multiline={4} value={description} onChange={(e) => {
//                                 setdescription(e.target.value);
//                             }} label="  Desciption" fullWidth />
//                             <TextField multiline={4} value={court_order_number} onChange={(e) => {
//                                 setcourt_order_number(e.target.value);
//                             }} label="Court Order Number" fullWidth />
//                         </div>
//                     </div>

//                     <TextField multiline={5} value={additional_information} onChange={(e) => {
//                         setadditional_information(e.target.value);
//                     }} label="Additional Information" fullWidth />

//                 </div>
//                 {submit_loading ? <Button style={{ width: "100%", backgroundColor: "#1482F0", color: "white", padding: 13 }}> <CircularProgress size={17} style={{ color: "white" }} /></Button> :
//                     <Button onClick={Submit} style={{ width: "100%", backgroundColor: "#1482F0", color: "white", padding: 13 }}>Assign Case</Button>}




//             </Modal>
//             <div className=' grid grid-cols-10'>
//                 <div className=' col-span-2'>
//                     <SideBar />
//                 </div>
//                 <div className=' col-span-8 bg-[#F0F1F3] px-4'>
//                     <div>
//                         <div className=' flex items-center justify-between bg-white p-4 shadow rounded-[4px] mt-9'>
//                             <TextField value={searchvalue} onChange={(e) => {
//                                 setsearchvalue(e.target.value);
//                             }} label="Search" style={{ width: "90%" }} />
//                             <div className=' flex items-center space-x-3'>
//                                 <Button>Filters</Button>
//                                 <Avatar style={{ width: 40, height: 40, backgroundColor: "#1482F0", textTransform: "uppercase" }}>{user?.username[0]}</Avatar>
//                             </div>
//                         </div>

//                         <div className=' my-16'>
//                             <TableContainer
//                                 elevation={3}
//                                 component={Paper}
//                                 style={{ borderRadius: 10 }}
//                             >
//                                 <div className=' flex items-center justify-between px-5 py-8'>
//                                     <h1 className=' text-xl'>Completed Cases</h1>
//                                     <Button title='Add New Case' onCancel={() => {
//                                         setopen_Modal(false);
//                                     }} onClick={() => {
//                                         setopen_Modal(true);
//                                     }} style={{ backgroundColor: "#1482F0", color: "white", textTransform: "initial", paddingLeft: 12, paddingRight: 13 }}>Assign Case</Button>
//                                 </div>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell
//                                                 style={{
//                                                     fontWeight: "bold",
//                                                     fontSize: "16px",
//                                                     fontFamily: "'Poppins', sans-serif",
//                                                     paddingLeft: 21,
//                                                 }}
//                                             >
//                                                 Case ID
//                                             </TableCell>
//                                             <TableCell
//                                                 style={{
//                                                     fontWeight: "bold",
//                                                     fontSize: "16px",
//                                                     fontFamily: "'Poppins', sans-serif",
//                                                 }}
//                                             >
//                                                 Case Title
//                                             </TableCell>

//                                             <TableCell
//                                                 style={{
//                                                     fontWeight: "bold",
//                                                     fontSize: "16px",
//                                                     fontFamily: "'Poppins', sans-serif",
//                                                 }}
//                                             >
//                                                 Examiners
//                                             </TableCell>
//                                             <TableCell
//                                                 style={{
//                                                     fontWeight: "bold",
//                                                     fontSize: "16px",
//                                                     fontFamily: "'Poppins', sans-serif",
//                                                 }}
//                                             >
//                                                 Date
//                                             </TableCell>
//                                             <TableCell
//                                                 style={{
//                                                     fontWeight: "bold",
//                                                     fontSize: "16px",
//                                                     fontFamily: "'Poppins', sans-serif",
//                                                 }}
//                                             >
//                                                 Status
//                                             </TableCell>
//                                             <TableCell
//                                                 style={{
//                                                     fontWeight: "bold",
//                                                     fontSize: "16px",
//                                                     fontFamily: "'Poppins', sans-serif",
//                                                 }}
//                                             >
//                                                 Actions
//                                             </TableCell>
//                                         </TableRow>
//                                     </TableHead>

//                                     <TableBody>
//                                         {
//                                             // All_Inventory
//                                             filteredcustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                                 .map((row) => {
//                                                     return (
//                                                         <TableRow key={row.studentid}>
//                                                             <TableCell
//                                                                 style={{
//                                                                     fontFamily: "'Poppins', sans-serif",
//                                                                     paddingLeft: 21,
//                                                                 }}
//                                                             >
//                                                                 {row.case_id}
//                                                             </TableCell>


//                                                             <TableCell
//                                                                 style={{ fontFamily: "'Poppins', sans-serif" }}
//                                                             >
//                                                                 {row.case_title}
//                                                             </TableCell>

//                                                             <TableCell
//                                                                 style={{ fontFamily: "'Poppins', sans-serif" }}
//                                                             >
//                                                                 {row.examiners}
//                                                             </TableCell>

//                                                             <TableCell
//                                                                 style={{ fontFamily: "'Poppins', sans-serif" }}
//                                                             >
//                                                                 {dayjs(row.date).format('MMMM DD, YYYY')}

//                                                             </TableCell>
//                                                             {row.status === "Completed" ?
//                                                                 <TableCell
//                                                                     style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold", color: "#12B76A", textTransform: "initial" }}
//                                                                 >
//                                                                     {row.status}
//                                                                 </TableCell>
//                                                                 : <TableCell
//                                                                     style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold", color: "#F79009", textTransform: "initial" }}
//                                                                 >
//                                                                     {row.status}
//                                                                 </TableCell>}

//                                                             <TableCell
//                                                                 style={{ fontFamily: "'Poppins', sans-serif" }}
//                                                             >
//                                                                 <Button onClick={() => {
//                                                                     navigate("/details", {
//                                                                         state: {
//                                                                             case_id: row.case_id,
//                                                                             case_title: row.case_title,
//                                                                             examiners: row.examiners,
//                                                                             date: row.date,
//                                                                             status: row.status,
//                                                                             device_type: row.device_type,
//                                                                             device_name: row.device_name,
//                                                                             device_serial_number: row.device_serial_number,
//                                                                             description: row.description,
//                                                                             exhibit_devices: row.exhibit_devices,
//                                                                             court_order_number: row.court_order_number,
//                                                                             tblid: row.tblid
//                                                                         }
//                                                                     });
//                                                                 }} style={{ backgroundColor: "#1482F0", color: "white", paddingLeft: 15, paddingRight: 15, textTransform: "initial" }}>View Case</Button>
//                                                             </TableCell>

//                                                         </TableRow>
//                                                     );
//                                                 })



//                                         }

//                                     </TableBody>
//                                 </Table>
//                                 <TablePagination
//                                     style={{ fontFamily: "'Poppins', sans-serif" }}
//                                     rowsPerPageOptions={[5, 10, 25]}
//                                     component="div"
//                                     count={All_Inventory.length}
//                                     rowsPerPage={rowsPerPage}
//                                     page={page}
//                                     onPageChange={handleChangePage}
//                                     onRowsPerPageChange={handleChangeRowsPerPage}
//                                 />
//                             </TableContainer>
//                         </div>

//                     </div>

//                 </div>
//             </div>
//         </>
//     )
// }

// export default Inventory;