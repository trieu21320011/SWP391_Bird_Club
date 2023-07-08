import React, { useState, useEffect } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import { baseURL } from '../../pages/baseUrl';
import axios from 'axios';
import { Switch } from '@mui/material';

function Invoices({

}) {
  const [newsfeeds, setNewsfeeds] = useState([])
  const getNewsfeeds = () => {
    const uid = localStorage.getItem("uid")
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/newsfeeds/by-member/' + uid,
    };

    axios.request(config)
      .then((response) => {
        setNewsfeeds(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getNewsfeeds()
  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu form tại đây (ví dụ: gửi đi, lưu trữ, ...)
  };

  if(newsfeeds.length === 0 ) return null;
  

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
                    <h1 class="text-xl font-semibold text-gray-900">Yours Blogs</h1>
                    <p class="mt-2 text-sm text-gray-700">
                      A list of all yours Blogs.
                    </p>
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
                              Title
                            </div>
                            
                            <div class="table-cell border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3">
                              Time
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden sm:table-cell">
                              Comment
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden lg:table-cell">
                              Status
                            </div>


                          </div>
                        </div>
                        {
                          newsfeeds.length > 0 ? newsfeeds.map((newsfeeds) => {
                            return (
                              <div class="table-header-group bg-white">
                                <turbo-frame id="row_record_10444" class="contents" target="_top">
                                  <div class="table-row">
                                    <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                      {newsfeeds.blog.tittle}
                                    </div>
                                    <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                      {newsfeeds.publicationTime}
                                    </div>
                                    <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                      {newsfeeds.blog.comments.length}
                                    </div>
                                    <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                      <Switch {...label} defaultChecked />
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

export default Invoices;