import React, { useState, useEffect, useRef } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import ProfileSidebar from "../../partials/community/ProfileSidebar";
import ProfileBody from "../../partials/community/ProfileBody";
import { baseURL } from '../../pages/baseUrl';
import axios from "axios";

function Profile() {
  const childRef = useRef()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [profileId, setProfileId] = useState("");
  const [profile, setProfile] = useState();
  const [records, setRecords] = useState([]);
  const onSetProfileId = (id) => {
    setProfileId(id);
    getProfile(id)
    childRef.current.onReloadNewsfeed(id)
    childRef.current.onReloadRecords(id)
  };
  const getProfile = (id) => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: baseURL + "/members/" + id,
    };
    axios(config)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    var id = window.location.search.split('=')[1]
    getProfile(id)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="relative flex">
            {/* Profile sidebar */}
            <ProfileSidebar
              profileSidebarOpen={profileSidebarOpen}
              setProfileSidebarOpen={setProfileSidebarOpen}
              setProfileId={onSetProfileId}
              profile={profile}
            />

            {/* Profile body */}
            <ProfileBody
              profileSidebarOpen={profileSidebarOpen}
              setProfileSidebarOpen={setProfileSidebarOpen}
              profileId={profileId}
              profile={profile}
              records={records}
              ref={childRef}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
