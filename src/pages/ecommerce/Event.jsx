import React, { useState, useEffect } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import CustomersTable from '../../partials/customers/CustomersTable';
import axios from 'axios';
import PaginationClassic from '../../components/PaginationClassic';
import { baseURL } from '../baseUrl';
import CancelIcon from '@mui/icons-material/Cancel';
import ModalBlank from '../../components/ModalBlank';
import Swal from 'sweetalert2';
import ModalBasic from '../../components/ModalBasic';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import moment from 'moment/moment';
import NotFoundImage from '../../images/404-illustration.svg';

function Events() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [scrollbarModalOpen, setScrollbarModalOpen] = useState(false)
  const [guest, setGuest] = useState([])
  const [activity, setActivity] = useState([])
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [rejectModal, setRejectModal] = useState(false)
  const [uid, setUid] = useState('')
  const [feedback, setFeedBack] = useState([])

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };


  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/activities?isAll=true',
    };
    axios.request(config)
      .then((response) => {
        setActivity(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleDecline = (e, id) => {
    e.preventDefault()
    setUid(id)
    setRejectModal(true)
  }

  const getFeedBack = (e, id) => {
    e.preventDefault()
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/feedbacks/' + id,
    };
    axios.request(config)
      .then((response) => {
        setFeedBack(response.data)
        setScrollbarModalOpen(true)
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          "Good job!",
          "Some thing went wrong!",
          "error",
        );
      });

  }
  const handleApprove = (e, id) => {
    console.log(id);
    e.preventDefault()
    setUid(id)
    setInfoModalOpen(true)
  }

  const handleJoin = (e) => {
    var data = JSON.stringify({
      "status": true
    });
    e.preventDefault()
    var config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: baseURL + '/activities/' + uid + '/status',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setInfoModalOpen(false)
        Swal.fire(
          "Good job!",
          "Success active event!",
          "success",
        );
        getData()
      })
      .catch(function (error) {
        console.log();
        setInfoModalOpen(false)
        getData()
        Swal.fire(
          "Oops!",
          "Some thing went wrong!",
          "error",
        );
      });

  }

  const handleReject = (e) => {
    var data = JSON.stringify({
      "status": false
    });
    e.preventDefault()
    var config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: baseURL + '/activities/' + uid + '/status',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setRejectModal(false)
        Swal.fire(
          "Good job!",
          "Success disabled!",
          "success",
        );
        getData()
      })
      .catch(function (error) {
        console.log();
        setRejectModal(false)
        getData()
        Swal.fire(
          "Oops!",
          "Some thing went wrong!",
          "error",
        );
      });


  }



  return (
    <div className="flex h-screen overflow-hidden">
      <ModalBlank id="info-modal" modalOpen={infoModalOpen} setModalOpen={setInfoModalOpen}>

        <div className="p-5 flex space-x-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-100">
            <svg className="w-4 h-4 shrink-0 fill-current text-indigo-500" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
            </svg>
          </div>
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800">Active this event ?</div>
            </div>
            {/* Modal content */}
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>Are you sure about this !!</p>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setInfoModalOpen(false); }}>Cancel</button>
              <button onClick={(e) => handleJoin(e)} className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Yes, I'm sure about this</button>
            </div>
          </div>
        </div>
      </ModalBlank>
      <ModalBasic id="scrollbar-modal" modalOpen={scrollbarModalOpen} setModalOpen={setScrollbarModalOpen} title={"Event" + "'s feedbacks"}>
        {/* Modal content */}
        {
          feedback.length > 0 ? (
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200 w-full">
                <tr>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Member</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Feedback date</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Rating</div>
                  </th>

                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap max-w-lg">
                    <div className="font-semibold text-left">Description</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-200">

                {
                  feedback.map(f => {
                    return (
                      <tr>
                        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="text-left">{f.ownerName}</div>
                        </td>
                        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="text-left">{moment(f.time).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}</div>
                        </td>
                        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="text-left"><Rating name="size-small" defaultValue={f.rating} size="small" readOnly /></div>
                        </td>
                        <td className="px-2 first:pl-5 last:pr-5 py-3 ">
                          {f.content}
                        </td>


                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          ) : (
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

              <div className="max-w-2xl m-auto mt-16">

                <div className="text-center px-4">
                  <div className="inline-flex mb-8">
                    <img src={NotFoundImage} width="176" height="176" alt="404 illustration" />
                  </div>
                  <div className="mb-6">No feedback for this event</div>
                </div>

              </div>

            </div>
          )}

        {/* Modal footer */}
        <div className="sticky bottom-0 px-5 py-4 bg-white border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setScrollbarModalOpen(false); }}>Close</button>
          </div>
        </div>
      </ModalBasic>
      <ModalBlank id="info-modal" modalOpen={rejectModal} setModalOpen={setRejectModal}>
        <div className="p-5 flex space-x-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-100">
            <svg className="w-4 h-4 shrink-0 fill-current text-indigo-500" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
            </svg>
          </div>
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800">Disable this event will make the event dissapear in the web ?</div>
            </div>
            {/* Modal content */}
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>Are you sure about this!!</p>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setRejectModal(false); }}>Cancel</button>
              <button onClick={(e) => handleReject(e)} className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Yes, I'm sure about this</button>
            </div>
          </div>
        </div>
      </ModalBlank>

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Manage Event ✨</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                {/* Delete button */}
                <DeleteButton selectedItems={selectedItems} />
                {/* Add customer button */}
              </div>

            </div>

            {/* Table */}
            <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
              <header className="px-5 py-4">
                <h2 className="font-semibold text-slate-800">All Event <span className="text-slate-400 font-medium">{activity.length}</span></h2>
              </header>
              <div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    {/* Table header */}
                    <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                      <tr>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Event Name</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Publication date</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Number of feedback</div>
                        </th>

                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Active/Inactive</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">View Feedbacks</div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm divide-y divide-slate-200">
                      {
                        activity.map(a => {
                          return (
                            <tr>
                              <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <Link className="font-semibold text-left" to={'/activity/meetups-post?id=' + a.id}>{a.name}</Link>
                              </td>
                              <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="text-left">{moment(a.createTime).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}</div>
                              </td>
                              <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="text-left">{a.feedbackCount}</div>
                              </td>
                              <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="flex flex-wrap items-center -m-1.5">
                                  {a.status ? (
                                    <div className="m-1.5">
                                      {/* Start */}
                                      <button className="btn border-slate-200 hover:border-slate-300" onClick={(e) => { e.stopPropagation(); handleDecline(e, a.id); }}>
                                        <CancelIcon color='error' />
                                      </button>
                                      {/* End */}
                                    </div>
                                  ) : (<div className="m-1.5">
                                    {/* Start */}
                                    <button className="btn border-slate-200 hover:border-slate-300" onClick={(e) => { e.stopPropagation(); handleApprove(e, a.id); }}>
                                      <svg className="w-4 h-4 fill-current text-indigo-500 shrink-0" viewBox="0 0 16 16">
                                        <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
                                      </svg>
                                    </button>
                                    {/* End */}
                                  </div>)}


                                </div>
                              </td>
                              <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="flex flex-wrap items-center -m-1.5">

                                  <div className="m-1.5">
                                    {/* Start */}
                                    <button className="btn border-slate-200 hover:border-slate-300" onClick={(e) => { e.stopPropagation(); getFeedBack(e, a.id); }}>
                                      <VisibilityIcon />
                                    </button>
                                    {/* End */}
                                  </div>
                                </div>
                              </td>


                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>

                </div>
              </div>
            </div>


          </div>
        </main>

      </div>

    </div>
  );
}

export default Events;