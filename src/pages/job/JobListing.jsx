import React, { useState ,useEffect} from 'react';
import axios from 'axios';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import JobSidebar from '../../partials/job/JobSidebar';
import DropdownSort from '../../components/DropdownSort';
import JobListItem from '../../partials/job/JobListItem';
import PaginationNumeric from '../../components/PaginationNumeric';
import NotFoundImage from '../../images/404-illustration.svg';

import Image01 from '../../images/company-icon-05.svg';
import Image02 from '../../images/company-icon-06.svg';
import Image03 from '../../images/company-icon-03.svg';
import Image04 from '../../images/company-icon-07.svg';
import Image05 from '../../images/company-icon-08.svg';
import Image06 from '../../images/company-icon-01.svg';
import Image07 from '../../images/company-icon-02.svg';
import { baseURL } from '../baseUrl';

function JobListing() {
  var eventId = window.location.search.split("=")[1];
  const [attendRequest, setAttendRequest] = useState([])

  const getAttendantList = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/activities/'+ eventId +'/attendance-requests' ,
    };

    axios.request(config)
      .then((response) => {
        setAttendRequest(response.data)
        console.log(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAttendantList()
  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(false);
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
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Attending request ✨</h1>
              </div>


            </div>

            {/* Page content */}
            <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">

              {/* Sidebar */}
              <JobSidebar />

              {/* Content */}
              <div className='w-full'>

                {/* Search form */}
                <div className="mb-5">
                  <form className="relative">
                    <label htmlFor="job-search" className="sr-only">Search</label>
                    <input id="job-search" className="form-input w-full pl-9 focus:border-slate-300" type="search" placeholder="Search request..." />
                    <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                      <svg className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                        <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                      </svg>
                    </button>
                  </form>
                </div>

                {/* Jobs header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-slate-500 italic">Showing {attendRequest.length} request</div>
                  {/* Sort */}
                  <div className="text-sm">
                    <span>Sort by </span>
                    <DropdownSort align="right" />
                  </div>
                </div>

                {/* Jobs list */}
                {attendRequest.length > 0 ? (
                  <div className='space-y-2'>
                  {attendRequest.map((item) => {
                    return (
                      <JobListItem
                        key={item.memberId}
                        id={item.memberId}
                        image={item.avatar}
                        role={item.displayName}
                        details={item.userType}
                        date={item.requestTime}
                        event={eventId}
                        callParentFunction={getAttendantList}
                      />
                    );
                  })}
                </div>
                ) : (
                  <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                <div className="max-w-2xl m-auto mt-16">

                  <div className="text-center px-4">
                    <div className="inline-flex mb-8">
                      <img src={NotFoundImage} width="176" height="176" alt="404 illustration" />
                    </div>
                    <div className="mb-6">Hiện chưa có request nào. Hãy kêu gọi thêm người nhé</div>
                  </div>

                </div>

              </div>
                )}
                

                {/* Pagination */}
                <div className="mt-6">
                  <PaginationNumeric />
                  
                </div>

              </div>

            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default JobListing;