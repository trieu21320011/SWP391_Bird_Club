import React, { useState, useEffect } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import SearchForm from '../../partials/actions/SearchForm';
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import { baseURL } from '../../pages/baseUrl';
import NotFoundImage from '../../images/404-illustration.svg';
import PaginationClassic from '../../components/PaginationClassic';
import axios from 'axios';
import moment from 'moment';
import ModalBlank from '../../components/ModalBlank';
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
  const [selectedItems, setSelectedItems] = useState([]);
  const [dangerModalOpen, setDangerModalOpen] = useState(false)
  const [blogId, setBlogId] = useState('')
  const [blog, setBlog] = useState([]);
  const totalColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'text-emerald-500';
      case 'Due':
        return 'text-amber-500';
      case 'Overdue':
        return 'text-rose-500';
      default:
        return 'text-slate-500';
    }
  };

  const deleteBlog = (e) => {
    e.preventDefault();
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: baseURL + "/blogs/" + blogId,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.request(config).then((response) => {
      console.log(response);
      setDangerModalOpen(false)
      getData();
    });
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-100 text-emerald-600';
      case 'Due':
        return 'bg-amber-100 text-amber-600';
      case 'Overdue':
        return 'bg-rose-100 text-rose-500';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };
  const uid = localStorage.getItem("uid")
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/newsfeeds/by-member/' + uid,
    };
    axios.request(config)
      .then((response) => {
        let newFeedList = response.data.newsfeeds
        let blogList = newFeedList.filter(i => i.newsfeedType === 0)
        console.log(blogList);
        setBlog(blogList)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <ModalBlank id="danger-modal" modalOpen={dangerModalOpen} setModalOpen={setDangerModalOpen}>
        <div className="p-5 flex space-x-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
            <svg className="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800">Remove the blog ?</div>
            </div>
            {/* Modal content */}
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>Are you sure you want to remove the blog.</p>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setDangerModalOpen(false); }}>Cancel</button>
              <button onClick={(e) => { e.stopPropagation(); deleteBlog(e); }} className="btn-sm bg-rose-500 hover:bg-rose-600 text-white">Yes, Remove it</button>
            </div>
          </div>
        </div>
      </ModalBlank>

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main class="pb-8 pt-8">
          <div class="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8">


            {/* More actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">

              {/* Right side */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Delete button */}
                <DeleteButton selectedItems={selectedItems} />
                {/* Dropdown */}
                <DateSelect />
                {/* Filter button */}
                <FilterButton align="right" />
              </div>

            </div>

            {/* Table */}
            <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
              <header className="px-5 py-4">
                <h2 className="font-semibold text-slate-800">Blogs <span className="text-slate-400 font-medium">{blog.length}</span></h2>
              </header>
              <div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    {/* Table header */}
                    <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                      <tr>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Title</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Create date</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Number of comment</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Number of like</div>
                        </th>

                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Remove</div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    {
                      blog.length > 0 ? (
                        <tbody className="text-sm divide-y divide-slate-200">
                          {
                            blog.map(b => {
                              return (
                                <tr>
                                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div className="font-medium text-sky-500">{b.blog.title}</div>
                                  </td>
                                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div className={`font-medium `}>{moment(new Date(b.publicationTime)).format("DD/MM/YYYY, h:mm:ss A")}</div>
                                  </td>
                                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div className="font-medium text-slate-800">{b.blog.comments.length}</div>
                                  </td>
                                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div>{b.blog.likeCount ? (b.blog.likeCount) : ("0")}</div>
                                  </td>
                                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                                    <div className="space-x-1">
                                    
                                      <button className="text-rose-500 hover:text-rose-600 rounded-full" onClick={(e) => {
                                        e.stopPropagation();
                                        setDangerModalOpen(true);
                                        setBlogId(b.id);
                                      }}>
                                        <span className="sr-only">Delete</span>
                                        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                          <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                                          <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                                        </svg>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })
                          }

                        </tbody>
                      ) : (
                        <tbody className="text-sm divide-y divide-slate-200">
                          <td colSpan={5}>
                            <div className="max-w-2xl m-auto mt-16">

                              <div className="text-center px-4">
                                <div className="inline-flex mb-8">
                                  <img src={NotFoundImage} width="176" height="176" alt="404 illustration" />
                                </div>
                                <div className="mb-6">There is no blog here, let create one</div>
                              </div>

                            </div>
                          </td>

                        </tbody>)}

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

export default Invoices;