
import React, { useState, useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { baseURL } from '../pages/baseUrl';
import axios from 'axios';




function Fintech() {

  const [browse, setBrowse] = useState([])
  const getBrowse = () => {
    
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/auth/listguest',
    };

    axios.request(config)
      .then((response) => {
        setBrowse(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [accept, setAccept] = useState([])
  const getAccept = (bookingid) =>{
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL+ '/auth/' + bookingid + '/aprove',
    };

    axios.request(config)
      .then((response) => {
        setAccept(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getBrowse()
    getAccept()
  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu form tại đây (ví dụ: gửi đi, lưu trữ, ...)
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
                    <h1 class="text-xl font-semibold text-gray-900">Browse Members</h1>
                    <p class="mt-2 text-sm text-gray-700">
                      A list members want become BirdClub's Members.
                    </p>
                  </div>
                  
                </div>



                <turbo-frame id="filters">
                  <div class="flex flex-col sm:rounded-lg shadow">
                    <div>
                      <dl class="sm:rounded-t-lg grid grid-cols-1 bg-white overflow-hidden border-b border-gray-200 divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
                        <div class="px-4 py-5 sm:p-6">
                          <dt class="text-base font-normal text-gray-900">Total</dt>
                          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                              16
                            </div>
                          </dd>
                        </div>

                        <div class="px-4 py-5 sm:p-6">
                          <dt class="text-base font-normal text-gray-900">Guest</dt>
                          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                              6
                            </div>
                          </dd>
                        </div>

                        <div class="px-4 py-5 sm:p-6">
                          <dt class="text-base font-normal text-gray-900">Members</dt>
                          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                              10
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
                              ID
                            </div>
                            <div class="table-cell border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 relative">
                              <span class="sr-only">Photo</span>
                            </div>
                            <div class="table-cell border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3">
                              Display Name
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden sm:table-cell">
                              Birthday
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden lg:table-cell">
                              Email
                            </div>
                            
                            <div class="table-cell border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 relative pl-3 pr-4 sm:pr-6">
                              <span class="sr-only">Edit</span>
                            </div>
                          </div>
                        </div>
                        {
                          browse.length > 0 ? browse.map((browse) => {
                            return (
                              <div class="table-header-group bg-white">
                                <turbo-frame id="row_record_10444" class="contents" target="_top">


                                  <div class="table-row">
                                    <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                      {browse.id}
                                    </div>
                                    <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                      <div class="flex flex-row items-center space-x-2">
                                      </div>
                                    </div>
                                    <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                      {browse.displayName}
                                    </div>
                                    <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                      {browse.birthday}
                                    </div>
                                    <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                      {browse.email}
                                    </div>
                                    
                                    <div class="table-cell border-b border-gray-200 text-sm text-gray-500 pl-3 pr-4  sm:pr-6">
                                      <div >
                                        <div class="relative inline-block">
                                           <a href='#popup2' id='openPopUp' className='btn-sm bg-indigo-500 hover:bg-indigo-600 text-white m-1'>Accecpt</a>

                                          <div id='popup2' className='overlay'>
                                            <div className='popup'>
                                              
                                              <h1 className='text-center text-2xl mt-4 '> Do you want to ACCEPT this Record? </h1>
                                              <a className='btn w-full bg-indigo-500 hover:bg-indigo-600 text-white' href='#' onClick={e => getAccept(browse.id)}>Yes</ a >
                                              <a className='btn w-full border-slate-200 hover:border-slate-300 text-slate-600' href='#'>No</a>
                                              
                                            </div>
                                          </div>

                                          <a href='#popup3' id='openPopUp' className='btn-sm bg-indigo-500 hover:bg-indigo-600 text-white m-1'>Reject</a>

                                          <div id='popup3' className='overlay'>
                                            <div className='popup'>

                                              <h1 className='text-center text-2xl mt-4 '> Do you want to REJECT this Record? </h1>
                                              <a className='btn w-full bg-indigo-500 hover:bg-indigo-600 text-white' href='#'>Yes</ a >
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

export default Fintech;