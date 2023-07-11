import React, { useState, useEffect } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';

import axios from 'axios';

import { baseURL } from '../baseUrl';
import CancelIcon from '@mui/icons-material/Cancel';
import ModalBlank from '../../components/ModalBlank';
import Swal from 'sweetalert2';

function Customers() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [guest, setGuest] = useState([])
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [rejectModal, setRejectModal] = useState(false)
  const [uid, setUid] = useState('')
  const [numberrecords, setNumberRecords] = useState([])

  const getNumberRecords = () => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/auth',
    };
    axios.request(config)
      .then((response) => {
        setNumberRecords(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };


  useEffect(() => {
    getData()
    getNumberRecords()
  }, [])

  const getData = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/auth/listguest',
    };
    axios.request(config)
      .then((response) => {
        setGuest(response.data)
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
  const handleApprove = (e, id) => {
    e.preventDefault()
    setUid(id)
    setInfoModalOpen(true)

  }

  const handleJoin = (e) => {
    e.preventDefault()
    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + '/auth/' + uid + '/approve',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setInfoModalOpen(false)
        Swal.fire(
          "Good job!",
          "Success promote!",
          "success",
        );
        getData()

      })
      .catch(function (error) {
        console.log();
        getData()
        setInfoModalOpen(false)
      });

  }

  const handleReject = (e) => {
    e.preventDefault()
    var config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: baseURL + '/auth/' + uid + '/reject',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setRejectModal(false)
        Swal.fire(
          "Good job!",
          "Success reject!",
          "success",
        );
        getData()

      })
      .catch(function (error) {
        console.log();
        setRejectModal(false)
        getData()
        Swal.fire(
          "Good job!",
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
              <div className="text-lg font-semibold text-slate-800">Promote this guest to member ?</div>
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
              <div className="text-lg font-semibold text-slate-800">Reject this guest and disbard him from the web ?</div>
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
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Manage Guest ✨</h1>
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
              {/* <h2 className="font-semibold text-slate-800">All Guest <span className="text-slate-400 font-medium">{guest.length}</span></h2> */}
              <div>
                <dl class="sm:rounded-t-lg grid grid-cols-1 bg-white overflow-hidden border-b border-gray-200 divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
                  <div class="px-4 py-5 sm:p-6">
                    <dt class="text-base font-normal text-gray-900">Total</dt>
                    <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                      <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                        {numberrecords.total}
                      </div>
                    </dd>
                  </div>

                  <div class="px-4 py-5 sm:p-6">
                    <dt class="text-base font-normal text-gray-900">Guest</dt>
                    <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                      <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                        {numberrecords.guest}
                      </div>
                    </dd>
                  </div>

                  <div class="px-4 py-5 sm:p-6">
                    <dt class="text-base font-normal text-gray-900">Members</dt>
                    <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                      <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                        {numberrecords.member}
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
              <div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    {/* Table header */}
                    <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                      <tr>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">User name</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Email</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Birthday</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Promote/Reject</div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm divide-y divide-slate-200">
                      {
                        guest.map(g => {
                          return (
                            <tr>
                              <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="text-left">{g.displayName}</div>
                              </td>
                              <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="text-left">{g.email}</div>
                              </td>
                              <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="text-left">{g.birthday}</div>
                              </td>
                              <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="flex flex-wrap items-center -m-1.5">

                                  <div className="m-1.5">
                                    {/* Start */}
                                    <button className="btn border-slate-200 hover:border-slate-300" onClick={(e) => { e.stopPropagation(); handleApprove(e, g.id); }}>
                                      <svg className="w-4 h-4 fill-current text-indigo-500 shrink-0" viewBox="0 0 16 16">
                                        <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
                                      </svg>
                                    </button>
                                    {/* End */}
                                  </div>
                                  <div className="m-1.5">
                                    {/* Start */}
                                    <button className="btn border-slate-200 hover:border-slate-300" onClick={(e) => { e.stopPropagation(); handleDecline(e, g.id); }}>
                                      <CancelIcon color='error' />
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

export default Customers;