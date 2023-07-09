import React, { useState, useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { baseURL } from '../pages/baseUrl';
import axios from 'axios';

function Analytics({
  BrowseRecordsInfo,
}) {
  const [records, setRecords] = useState([])
  const [browserecords, setBrowserecords] = useState(null)
  const getRecords = () => {
    const uid = localStorage.getItem("uid")
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/records/by-member/' + uid,
    };

    axios.request(config)
      .then((response) => {
        setRecords(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [editrecords, setEditrecords] = useState([])
  const getEditrecords = () => {
    const uid = localStorage.getItem("uid")
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: baseURL + '/records/' + uid,
    };

    axios.request(config)
      .then((response) => {
        setEditrecords(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [delrecords, setDelrecords] = useState([])
  const getDelrecords = (bookingid) => {

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: baseURL + '/records/' + bookingid + '/delete-record',
    };

    axios.request(config)
      .then((response) => {
        setDelrecords(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getRecords()
    getEditrecords()
    getDelrecords()
  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bird, setBird] = useState('');
  const [number, setNumber] = useState('');
  const [note, setNote] = useState('');
  const [picture, setPicture] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu form tại đây (ví dụ: gửi đi, lưu trữ, ...)
    console.log('Bird:', bird);
    console.log('Number:', number);
    console.log('Note:', note);
    console.log('Picture:', picture);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main class="pb-8 pt-8">
          <div class="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8">

            <div class="grid grid-cols-1 items-start lg:grid-cols-5 lg:gap-8">
              <div class="grid grid-cols-1 gap-4 lg:col-span-5">

                <div class="sm:flex sm:items-center px-4 sm:px-0">
                  <div class="sm:flex-auto">
                    <h1 class="text-xl font-semibold text-gray-900">Bird Records</h1>
                    <p class="mt-2 text-sm text-gray-700">
                      A list of all your bird records.
                    </p>
                  </div>
                  <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <a href='#popup1' id='openPopUp' class="px-4 py-2 text-sm text-white shadow-sm border-transparent bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 inline-flex items-center border font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2">
                      Add Records
                    </a>
                  </div>
                  <div id='popup1' className='overlay'>
                    <div className='popup'>
                      <a className='close' href='#'>&times;</a>

                      <div class="bg-white shadow sm:rounded-lg">
                        <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 sm:rounded-t-lg">
                          <div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                            <div class="ml-4 mt-2">
                              <h3 class="text-lg leading-6 font-medium text-gray-900">
                                Bird List
                              </h3>
                              <p class="mt-1 text-sm text-gray-500">
                                Add as many records as you like and attach any photos you've taken.
                              </p>
                            </div>

                          </div>
                        </div>
                        <div class="bg-white sm:rounded-b-lg sm:rounded-t-lg">

                          <div class="flex flex-col w-full">
                            <div className='popup-margin'>
                              <form onSubmit={handleSubmit}>
                                <label class="block text-sm font-medium text-gray-700" for="birding_session_location_id">
                                  BirdId:
                                  <input class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 shadow-sm focus:outline-none focus:ring-1 sm:text-sm border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                    type="text"
                                    value={bird}
                                    onChange={(e) => setBirdId(e.target.value)}
                                  />
                                </label>
                                <br />


                                <label class="block text-sm font-medium text-gray-700" for="birding_session_location_id">
                                  Species:
                                  <input class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 shadow-sm focus:outline-none focus:ring-1 sm:text-sm border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                    type="text"
                                    value={bird}
                                    onChange={(e) => setBirdSpecies(e.target.value)}
                                  />
                                </label>
                                <br />
                                <label class="block text-sm font-medium text-gray-700" for="birding_session_location_id">
                                  Quantity:
                                  <input class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 shadow-sm focus:outline-none focus:ring-1 sm:text-sm border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                    type="number"
                                    value={number}
                                    onChange={(e) => setQuantity(e.target.value)}
                                  />
                                </label>
                                <br />

                                <label class="block text-sm font-medium text-gray-700" for="birding_session_location_id">
                                  Picture:
                                  <br />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePictureChange}
                                  />
                                </label>
                                <br />

                                <a type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500" href='#'>Submit</a>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>



                <turbo-frame id="filters">
                  <div class="flex flex-col sm:rounded-lg shadow">
                    <div>
                      <dl class="sm:rounded-t-lg grid grid-cols-1 bg-white overflow-hidden border-b border-gray-200 divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
                        <div class="px-4 py-5 sm:p-6">
                          <dt class="text-base font-normal text-gray-900">Total Records</dt>
                          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                              6
                            </div>
                          </dd>
                        </div>

                        <div class="px-4 py-5 sm:p-6">
                          <dt class="text-base font-normal text-gray-900">Unique Species</dt>
                          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                              4
                            </div>
                          </dd>
                        </div>

                        <div class="px-4 py-5 sm:p-6">
                          <dt class="text-base font-normal text-gray-900">Recorders</dt>
                          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                              2
                            </div>
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div class="overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-b-lg">
                      <div class="table min-w-full">
                        <div class="bg-gray-50 table-header-group">
                          <div class="table-row">
                            <div class="table-cell border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 pl-4 pr-3 sm:pl-6">
                              Newsfeed ID
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden sm:table-cell">
                              Species
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden lg:table-cell">
                              Quantity
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden lg:table-cell">
                              Picture
                            </div>
                            <div class="table-cell border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 relative pl-3 pr-4 sm:pr-6">
                              <span class="sr-only">Edit</span>
                            </div>
                          </div>
                        </div>

                        {
                          records.length > 0 ? records.map((records) => {
                            return (
                              <div class="table-header-group bg-white">
                                <turbo-frame id="row_record_10444" class="contents" target="_top">


                                  <div class="table-row">
                                    <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                      {records.newsfeedId}
                                    </div>
                                    <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                      <a >{records.species}</a>
                                    </div>
                                    <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                      <a >{records.quantity}</a>
                                    </div>
                                    <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                      <img className='w-40 mt-4' src={records.photo} width="32" height="32" alt="User 08" />
                                    </div>
                                    <div class="table-cell border-b border-gray-200 text-sm text-gray-500 pl-3 pr-4  sm:pr-6">
                                      <div >
                                        <div class="relative inline-block">
                                          <a href='#popup2' id='openPopUp' className='btn-sm bg-indigo-500 hover:bg-indigo-600 text-white m-1' onClick={() => setBrowserecords(records)}>Edit</a>

                                          <div id='popup2' className='overlay'>
                                            <div className='popup'>
                                              <a className='close' href='#'>&times;</a>


                                              <div class="bg-white shadow sm:rounded-lg">
                                                <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 sm:rounded-t-lg">
                                                  <div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                                                    <div class="ml-4 mt-2">
                                                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                                                        Bird List
                                                      </h3>
                                                      <p class="mt-1 text-sm text-gray-500">
                                                        Add as many records as you like and attach any photos you've taken.
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="bg-white sm:rounded-b-lg sm:rounded-t-lg">

                                                  <div class="flex flex-col w-full">
                                                    <div className='popup-margin'>
                                                      <form onSubmit={handleSubmit}>
                                                        <label class="block text-sm font-medium text-gray-700" for="birding_session_location_id">
                                                          BirdId:
                                                          <input class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 shadow-sm focus:outline-none focus:ring-1 sm:text-sm border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                                            type="text"
                                                            defaultValue={browserecords ? (browserecords.birdId) : ("")}
                                                            onChange={(e) => getEditrecords(e.target.value)}
                                                          />
                                                        </label>
                                                        <br />
                                                        <label class="block text-sm font-medium text-gray-700" for="birding_session_location_id">
                                                          Species:
                                                          <input class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 shadow-sm focus:outline-none focus:ring-1 sm:text-sm border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                                            type="text"
                                                            defaultValue={browserecords ? (browserecords.species) : ("")}
                                                            onChange={(e) => getEditrecords(e.target.value)}
                                                          />
                                                        </label>
                                                        <br />
                                                        <label class="block text-sm font-medium text-gray-700" for="birding_session_location_id">
                                                          Quantity:
                                                          <input class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 shadow-sm focus:outline-none focus:ring-1 sm:text-sm border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                                            type="number"
                                                            defaultValue={browserecords ? (browserecords.quantity) : ("")}
                                                            onChange={(e) => getEditrecords(e.target.value)}
                                                          />
                                                        </label>
                                                        <br />

                                                        <label class="block text-sm font-medium text-gray-700" for="birding_session_location_id">
                                                          Picture:
                                                          <br />
                                                          <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handlePictureChange}
                                                          />
                                                        </label>
                                                        <br />

                                                        <a type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500" href='#' onClick={e => getEditrecords(editrecords)}>Submit</a>
                                                      </form>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                            </div>
                                          </div>

                                          <a href='#popup3' id='openPopUp' className='btn-sm bg-indigo-500 hover:bg-indigo-600 text-white m-1'>Delete</a>

                                          <div id='popup3' className='overlay'>
                                            <div className='popup'>

                                              <h1 className='text-center text-2xl mt-4 '> Do you want to Delete this Record? </h1>
                                              <a className='btn w-full bg-indigo-500 hover:bg-indigo-600 text-white' href='#' onClick={e => getDelrecords(records.newsfeedId)}>Yes</ a >
                                              <a className='btn w-full border-slate-200 hover:border-slate-300 text-slate-600' href='#'>No</a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>


                                </turbo-frame>


                              </div>
                            )
                          }
                          ) : <div></div>
                        }
                      </div>
                    </div>

                  </div>

                </turbo-frame>



              </div>
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default Analytics;