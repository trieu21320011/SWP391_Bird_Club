import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Tooltip from '../../components/Tooltip';
import dayjs from 'dayjs';


import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Datepicker from '../../components/Datepicker';
import ReactQuill from 'react-quill';
import { baseURL } from '../baseUrl';
import axios from 'axios';
import { TimePicker } from '@mui/x-date-pickers';
import { Link } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../pages/enum/roleEnum';
function MeetupCreate() {
    const nav = useNavigate()
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "image",
        "background",
        "align",
        "size",
        "font"
    ];
    const uid = localStorage.getItem("uid")
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: [] }],
            [{ font: [] }],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ color: ["red", "#785412"] }],
            [{ background: ["red", "#785412"] }]
        ]
    };
    const [count, setCount] = useState([]);
    const handleChoose = data => {
        setCount(data);
        setFromTime(data[0])
        setToTime(data[1])
        console.log('argument from Child: ', data);
    }
    
    const handleCreate = (e) => {
        e.preventDefault()
        debugger
        if (title === '' 
        || fromTime === null 
        || toTime === null
        || startTime === null 
        || endTime === null
        || location === ''
        || description === ''
        || type === ''
        || image === '') {

            Swal.fire(
                "Oops!",
                "Missing some field",
                "error",
            );
        } else {            
            const newFromDate = new Date(fromTime);
            newFromDate.setUTCHours(dayjs(startTime).hour());
            newFromDate.setUTCMinutes(dayjs(startTime).minute());
            newFromDate.setDate(newFromDate.getDate() + 1)
            const newFromDate1 = newFromDate.toISOString();
            const newToDate = new Date(toTime);
            newToDate.setUTCHours(dayjs(endTime).hour());
            newToDate.setUTCMinutes(dayjs(endTime).minute());
            newToDate.setDate(newToDate.getDate() + 1)
            const newToDate1 = newToDate.toISOString();
            Swal.fire({
                title: 'Loading',
                html: 'This will close in a minutes',

                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                },
            })
            var data = JSON.stringify({
                "name": title,
                "startTime": newFromDate1,
                "endTime": newToDate1,
                "location": location,
                "description": description,
                "activityType": type,
                "ownerId": parseInt(uid, 10),
                "background": image,
            });
            console.log(data);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: baseURL + '/activities',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(response);
                    Swal.close()
                    Swal.fire(
                        "Good job!",
                        "You success create a blog!",
                        "success",
                    );
                    nav("/activity/meetups")
                })
                .catch(function (error) {
                    console.log();
                    Swal.close()
                    Swal.fire(
                        "Oops!",
                        "Some thing went wrong",
                        "error",
                    );
        

                });

        }


    }
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [title, setTile] = useState("");
    const [description, setDescription] = useState("");
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);
    const [location, setLocation] = useState("");
    const [type, setType] = useState('');
    const [image, setImage] = useState('');

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Page header */}
                        <div className="mb-8">
                            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Create Event ✨</h1>
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                                {/* Add board button */}
                                <button onClick={(e) => handleCreate(e)} className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <span className="ml-2"> Save Changes</span>
                                </button>

                            </div>
                        </div>

                        <div className="border-t border-slate-200">

                            {/* Components */}
                            <div className="space-y-8 mt-8">
                                {/* Input Types */}
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="country">
                                        Title
                                    </label>
                                    <div className="grid gap-5 md:grid-cols-1">
                                        <input onChange={(e) => setTile(e.target.value)} className="form-input w-full pl-9" type="search" />
                                    </div>
                                </div>

                                {/* Date Types */}
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="country">
                                        Pick date
                                    </label>
                                    <div className="grid gap-5 md:grid-cols-1">
                                        <Datepicker handleChoose={handleChoose} ></Datepicker>
                                    </div>
                                </div>
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium mb-1" htmlFor="country">
                                            Start time
                                        </label>
                                        <div className="grid gap-2 md:grid-cols-1">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['TimePicker']}>
                                                    <TimePicker onChange={(e) => setStartTime(e)} label="Input start time" />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1" htmlFor="country">
                                            End time
                                        </label>
                                        <div className="grid gap-5 md:grid-cols-1">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['TimePicker']}>
                                                    <TimePicker onChange={(e) => setEndTime(e)} label="Input end time" />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="country">
                                        Location
                                    </label>
                                    <div className="grid gap-5 md:grid-cols-1">
                                        <input onChange={(e) => setLocation(e.target.value)} className="form-input w-full pl-9" type="search" />
                                    </div>
                                </div>

                                {/* Input States */}

                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="country">
                                        Description
                                    </label>
                                    <ReactQuill theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={description} onChange={setDescription} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="name">Image URL <span className="text-rose-500">*</span></label>
                                    <input id="name" className="form-input w-full px-2 py-1" type="text" required onChange={e => setImage(e.target.value)} />
                                </div>

                                {/* Select */}
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="country">
                                        Loại event
                                    </label>
                                    <select value={type} onChange={(e) => setType(e.target.value)} id="country" className="form-select">
                                        <option value={"ONLINE"}>Online Event</option>
                                        <option value={"OFFLINE"}>Offline Event</option>
                                        <option value={"TOURNAMENT"}>Tournament</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default MeetupCreate;