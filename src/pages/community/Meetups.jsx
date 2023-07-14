import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import SearchForm from '../../partials/actions/SearchForm';
import MeetupsPosts from '../../partials/community/MeetupsPosts';
import PaginationNumeric from '../../components/PaginationNumeric';
import axios from 'axios';
import { Role } from '../../pages/enum/roleEnum';

import { baseURL } from "../baseUrl";

function Meetups() {
  const [event, setEvents] = useState([]);
  const [filteredEvent, setFilteredEvent] = useState([]);
  const [selectedType, setSelectedType] = useState('ALL')
  const getData = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: baseURL + "/activities",
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
        setFilteredEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const role = localStorage.getItem('role')

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  Event ✨
                </h1>
              </div>

              {/* Right: Actions */}
              {( role === Role.admin || role === Role.manager || role === Role.staff) && (
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                {/* Search form */}
                {/* <SearchForm placeholder="Search…" /> */}

                {/* Add meetup button */}
                
                <Link to="/activity/meetups-create" className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Event</span>
                </Link>
              </div>
              )}
            </div>

            {/* Filters */}
            <div className="mb-5">
              <ul className="flex flex-wrap -m-1">
                <li className="m-1">
                  <button
                    onClick={() => {
                      setSelectedType('ALL')
                      setFilteredEvent(event);
                    }}
                    className={"inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out " + (selectedType == 'ALL' ? "bg-indigo-500 text-white" : "bg-white text-slate-500")}
                  >
                    View All
                  </button>
                </li>
                <li className="m-1">
                  <button
                    onClick={() => {
                      setSelectedType('ONLINE')
                      setFilteredEvent(
                        event.filter((e) => e.activityType == "ONLINE")
                      );
                    }}
                    className={"inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-smduration-150 ease-in-out " + (selectedType == 'ONLINE' ? "bg-indigo-500 text-white" : "bg-white text-slate-500")}
                  >
                    Online
                  </button>
                </li>
                <li className="m-1">
                  <button
                    onClick={() => {
                      setSelectedType('OFFLINE')
                      setFilteredEvent(
                        event.filter((e) => e.activityType == "OFFLINE")
                      );
                    }}
                    className={"inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out " + (selectedType == 'OFFLINE' ? "bg-indigo-500 text-white" : "bg-white text-slate-500")}
                  >
                    Offline
                  </button>
                </li>
                <li className="m-1">
                  <button
                    onClick={() => {
                      setSelectedType('TOURNAMENT')
                      setFilteredEvent(
                        event.filter((e) => e.activityType == "TOURNAMENT")
                      );
                    }}
                    className={"inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm  duration-150 ease-in-out " + (selectedType == 'TOURNAMENT' ? "bg-indigo-500 text-white" : "bg-white text-slate-500")}
                  >
                    Tournament
                  </button>
                </li>
                {/* <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                    This Month
                  </button>
                </li>
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                    Following
                  </button>
                </li> */}
              </ul>
            </div>
            <div className="text-sm text-slate-500 italic mb-4">
              {filteredEvent.length} Activities
            </div>

            {/* Content */}
            <MeetupsPosts data={filteredEvent} />

            {/* Pagination */}
            {/* <div className="mt-8">
                <PaginationNumeric />
              </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Meetups;
