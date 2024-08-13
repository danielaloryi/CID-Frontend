import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar';
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
    MenuItem,
    TextField,
    Button,
    Divider
} from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from 'axios';
import BASEURL from '../Connection/Connection';
import { DatePicker, Modal, message } from 'antd';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import dayjs from 'dayjs';

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [open_Modal, setopen_Modal] = useState(false);

    const [date__, setdate__] = useState(null);
    const [case_title, setcase_title] = useState(location?.state?.case_title);
    const [examiners, setexaminers] = useState(location?.state?.examiners);
    const [status, setstatus] = useState(location?.state?.status);
    const [device_type, setdevice_type] = useState(location?.state?.device_type);
    const [device_name, setdevice_name] = useState(location?.state?.device_name);
    const [device_serial_number, setdevice_serial_number] = useState(location?.state?.device_serial_number);
    const [description, setdescription] = useState(location?.state?.description);
    const [submit_loading, setsubmit_loading] = useState(false);
    const [exhibit_devices, setexhibit_devices] = useState(location?.state?.exhibit_devices);
    const [court_order_number, setcourt_order_number] = useState(location?.state?.court_order_number);
    const [additional_information, setadditional_information] = useState(location?.state?.additional_information);


    const Submit = () => {
        setsubmit_loading(true);
        const payload = {
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
        axios.put(`${BASEURL}/cases/update_case/${location?.state?.tblid}`, payload).then((response) => {
            setsubmit_loading(false);
            const data = response.data;
            if (data) {
                message.success("Cases Updated Successfully!!");
                setopen_Modal(false);
                window.location.reload();
            }

        }).catch((err) => {
            setsubmit_loading(false);
            console.log(err);
        })
    }


    const [numberOfInputs, setNumberOfInputs] = useState("");
    const [inputValues, setInputValues] = useState([]);



    const handleNumberChange = (event) => {
        const number = event.target.value;
        setNumberOfInputs(number);
        setInputValues(Array.from({ length: number }, (_, index) => ({ id: index + 1, device_type: "", device_name: "", device_serial_number: "", device_description: "" })));
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const values = [...inputValues];
        values[index][name] = value;
        setInputValues(values);
    };



    const [submit_device_loading, setsubmit_device_loading] = useState(false);

    const Submit_devices = () => {
        setsubmit_device_loading(true);
        const payload = {
            caseid: location?.state?.tblid,
            inputValues
        }

        axios.post(`${BASEURL}/devices/add_devices`, payload).then((response) => {
            const data = response.data;
            if (data) {
                setsubmit_device_loading(false);
                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
            setsubmit_device_loading(false);
        })
    }

    const [Get_Case, setGet_Case] = useState([]);

    useEffect(() => {
        axios.get(`${BASEURL}/devices/${location?.state?.tblid}`).then((response) => {
            const data = response.data;
            setGet_Case(data);
            console.log(data);
        })

    }, []);

    console.log(Get_Case);



    return (
        <>
            <Modal width={900} footer={null} title={<h1 className='text-center'>Edit Case Deatils</h1>} onCancel={() => {
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
                                    {["inspectors", "detectives"].map((count) => (
                                        <MenuItem key={count} value={count}>
                                            {count}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <DatePicker placeholder='date' className=' py-4' style={{ width: "100%" }} value={date__} onChange={(e) => {
                                setdate__(e);
                            }} />
                            <TextField value={device_type} onChange={(e) => {
                                setdevice_type(e.target.value);
                            }} label="Device Type" fullWidth />

                            <TextField multiline={4} value={exhibit_devices} onChange={(e) => {
                                setexhibit_devices(e.target.value);
                            }} label="Exhibit Devices" fullWidth />
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
                                    {["Completed", "Inprogress"].map((count) => (
                                        <MenuItem key={count} value={count}>
                                            {count}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField value={device_name} onChange={(e) => {
                                setdevice_name(e.target.value);
                            }} label="Device Name" fullWidth />

                            <TextField value={device_serial_number} onChange={(e) => {
                                setdevice_serial_number(e.target.value);
                            }} label="Device Serial Number" fullWidth />

                            <TextField multiline={4} value={description} onChange={(e) => {
                                setdescription(e.target.value);
                            }} label="  Desciption" fullWidth />
                            <TextField multiline={4} value={court_order_number} onChange={(e) => {
                                setcourt_order_number(e.target.value);
                            }} label="Court Order Number" fullWidth />
                        </div>
                    </div>

                    <TextField multiline={5} value={additional_information} onChange={(e) => {
                        setadditional_information(e.target.value);
                    }} label="Additional Information" fullWidth />

                </div>
                {submit_loading ? <Button onClick={Submit} style={{ width: "100%", backgroundColor: "#1482F0", color: "white", padding: 13 }}> <CircularProgress size={17} style={{ color: "white" }} /></Button> :
                    <Button onClick={Submit} style={{ width: "100%", backgroundColor: "#1482F0", color: "white", padding: 13 }}>Edit</Button>}




            </Modal>
            <div className=' grid grid-cols-10'>
                <div className=' col-span-2'>
                    <SideBar />
                </div>
                <div className=' col-span-8 bg-[#F0F1F3] px-4'>
                    <div className=' bg-white shadow-sm rounded-[6px] p-8 mt-7'>
                        <div className=' flex justify-between'>
                            <div>
                                <IconButton onClick={() => {
                                    navigate(-1);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </IconButton>

                            </div>
                            <div>
                                <h1 className=' text-[#48505E] font-bold text-xl'>Case Details</h1>
                            </div>
                            <div>{location.state.status === "Completed" ?
                                <Button style={{ backgroundColor: "#12B76A", color: "white", paddingLeft: 20, paddingRight: 20 }}>{location.state.status}</Button>
                                : <Button style={{ backgroundColor: "#F79009", color: "white", paddingLeft: 20, paddingRight: 20 }}>{location.state.status}</Button>}
                            </div>
                        </div>
                        <div className=' mt-4'>
                            <Divider />
                        </div>
                        <div className=' grid grid-cols-10'>
                            {/* <Divider /> */}
                            <div className=' col-span-5'>
                                <div className=' mt-10'>
                                    <div>
                                        <h1 className=' font-bold  text-xl'>Primary Details</h1>
                                        <div style={{ borderBottom: "2px solid #1482F0 ", width: "12%" }}>

                                        </div>
                                    </div>
                                    <div className=' py-4'>
                                        <div className=' flex items-center space-x-10 py-3'>
                                            <h1 className=' text-[#9299A6] font-bold'>Case ID</h1>
                                            <h1 >{location.state.case_id}</h1>
                                        </div>
                                        <div className=' flex items-center space-x-10 py-3'>
                                            <h1 className=' text-[#9299A6] font-bold'>Case Title</h1>
                                            <h1>{location.state.case_title}</h1>
                                        </div>
                                        <div className=' flex items-center space-x-10 py-3'>
                                            <h1 className=' text-[#9299A6] font-bold'>Examiners</h1>
                                            <h1>{location.state.examiners}</h1>
                                        </div>
                                        <div className=' flex items-center space-x-10 py-3'>
                                            <h1 className=' text-[#9299A6] font-bold'>Date Received</h1>
                                            <h1>  {dayjs(location.state.date).format('MMMM DD, YYYY')}

                                            </h1>
                                        </div>

                                        <div className=' flex items-center space-x-10 py-3'>
                                            <h1 className=' text-[#9299A6] font-bold'>Court Order Number</h1>
                                            <h1>{location.state.court_order_number}</h1>
                                        </div>

                                        <div className=' flex items-center space-x-10 py-3'>
                                            <h1 className=' text-[#9299A6] font-bold'>Exibit device</h1>
                                            <FormControl fullWidth>
                                                <InputLabel id="number-select-label">Number of Inputs</InputLabel>
                                                <Select
                                                    labelId="number-select-label"
                                                    value={numberOfInputs}
                                                    onChange={handleNumberChange}
                                                    label="Number of Inputs"
                                                >
                                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((number) => (
                                                        <MenuItem key={number} value={number}>
                                                            {number}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {/* <h1>{location.state.exhibit_devices}</h1> */}
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className=' col-span-5'>
                                <div>
                                    <h1 className=' font-bold  text-xl  mt-10'>Additional Information</h1>
                                </div>
                                <div style={{ borderBottom: "2px solid #1482F0 ", width: "12%" }}>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h1 className=' font-bold  text-xl text-[#48505e] '>Device Details</h1>
                        </div>
                        <div style={{ borderBottom: "2px solid #1482F0 ", width: "7%" }}>

                        </div>

                        <div>
                            {
                                inputValues.map((input, index) => (
                                    <div key={index} className='grid grid-cols-3 gap-5 py-4'>
                                        <div className=''>
                                            <TextField
                                                name="device_type"
                                                label="Device Type"
                                                fullWidth
                                                value={input.device_type}
                                                onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </div>
                                        <div className=''>
                                            <TextField
                                                name="device_name"
                                                label="Device Name"
                                                fullWidth
                                                value={input.device_name}
                                                onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </div>
                                        <div className=''>
                                            <TextField
                                                name="device_serial_number"
                                                label="Device Serial Number"
                                                fullWidth
                                                value={input.device_serial_number}
                                                onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </div>
                                        <div className=' col-span-3'>
                                            <TextField
                                                name="device_description"
                                                label="Device Description"
                                                fullWidth
                                                value={input.device_description}
                                                onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                            {numberOfInputs === 0 ? null :
                                <div className=' flex justify-end py-3'>
                                    <Button onClick={Submit_devices} style={{ backgroundColor: "#1482F0", color: "white", paddingLeft: 20, paddingRight: 20, textTransform: "initial" }}>{submit_device_loading ? "Submitting.." : "Submit"}</Button>
                                </div>
                            }
                        </div>
                        {
                            Get_Case.map((list) => {
                                return (
                                    <div>
                                        <div className=' flex items-center justify-between py-5'>
                                            <div className=' space-y-3'>
                                                <h1 className=' text-[#9299A6] font-bold'>Device Type</h1>
                                                <h1 className=' text-[#48505E] font-bold'>{list.device_type}</h1>
                                            </div>
                                            <div className=' space-y-3'>
                                                <h1 className=' text-[#9299A6] font-bold'>Device Name</h1>
                                                <h1 className=' text-[#48505E] font-bold'>{list.device_name}</h1>
                                            </div>
                                            <div className=' space-y-3'>
                                                <h1 className=' text-[#9299A6] font-bold'>Device Serial Number</h1>
                                                <h1 className=' text-[#48505E] font-bold'>{list.device_serial_number}</h1>
                                            </div>
                                            <div className=' space-y-3'>
                                                <h1 className=' text-[#9299A6] font-bold'>Description</h1>
                                                <h1 className=' text-[#48505E] font-bold'>{list.device_description}</h1>
                                            </div>
                                        </div>
                                        <Divider />
                                    </div>
                                );
                            })
                        }



                        <div className=' grid place-items-center py-6'>
                            <div className=' flex items-center space-x-9'>
                                <Button onClick={() => {
                                    setopen_Modal(true);
                                }} style={{ backgroundColor: "#1482F0", color: "white", paddingLeft: 30, paddingRight: 30, textTransform: "initial" }} startIcon={<EditOutlinedIcon />}>Edit</Button>
                                <Button onClick={
                                    () => {
                                        Modal.warning({
                                            content: "Are you sure you want to delete?",
                                            closable: true,
                                            okType: "dashed",
                                            onOk: () => {
                                                axios.delete(`${BASEURL}/cases/delete_case/${location.state.tblid}`).then((response) => {
                                                    const data = response.data;
                                                    if (data) {
                                                        message.success("Case Deleted Successfully!!")
                                                        window.location.reload();
                                                        navigate(-1);
                                                    }

                                                }).catch((err) => {
                                                    console.log(err);
                                                })
                                            }
                                        });
                                    }
                                } style={{ backgroundColor: "red", color: "white", paddingLeft: 20, paddingRight: 20, textTransform: "initial" }} startIcon={<DeleteOutlineOutlinedIcon />}>Delete</Button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Details;



