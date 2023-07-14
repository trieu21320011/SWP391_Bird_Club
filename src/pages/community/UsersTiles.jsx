import React, { useEffect, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import SearchForm from '../../partials/actions/SearchForm';
import UsersTilesCard from '../../partials/community/UsersTilesCard';
import PaginationNumeric from '../../components/PaginationNumeric';
import { baseURL } from '../baseUrl';

import Image01 from '../../images/user-64-01.jpg';
import Image02 from '../../images/user-64-02.jpg';
import Image03 from '../../images/user-64-03.jpg';
import Image04 from '../../images/user-64-04.jpg';
import Image05 from '../../images/user-64-05.jpg';
import Image06 from '../../images/user-64-06.jpg';
import Image07 from '../../images/user-64-07.jpg';
import Image08 from '../../images/user-64-08.jpg';
import Image09 from '../../images/user-64-09.jpg';
import Image10 from '../../images/user-64-10.jpg';
import Image11 from '../../images/user-64-11.jpg';
import Image12 from '../../images/user-64-12.jpg';
import axios from 'axios';
function UsersTiles() {
  const [members,setMembers] = useState([])

  useEffect (()=> {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL+'/members',
    };
    
    axios.request(config)
    .then((response) => {
      setMembers(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
    
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
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Club Member. ✨</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Search form */}
                {/* <SearchForm /> */}
                {/* Add member button */}
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {
                members
                .filter(m => m.membershipStatus === true)
                .map(m => {
                  return (
                    <UsersTilesCard
                      key={m.id}
                      id={m.id}
                      name={m.displayName}
                      image={m.avatar}
                      link={'?id='+m.id}
                      location={m.userType}
                      content=""
                    />
                  )
                })
              }
            </div>

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

export default UsersTiles;