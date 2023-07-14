import React, { useState, useEffect } from "react";
import ProfileImage from "../../images/user-avatar-32.png";
import { baseURL } from "../../pages/baseUrl";
import axios from "axios";

function ProfileSidebar({
  profileSidebarOpen,
  setProfileSidebarOpen,
  setProfileId,
  profile,
}) {
  const [members, setMembers] = useState([]);
  const [selectedId, selectMember] = useState("");

  const getMembers = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: baseURL + "/members",
    };

    axios
      .request(config)
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSelectMember = (id) => {
    selectMember(id);
    setProfileId(id);
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div
      id="profile-sidebar"
      className={`absolute z-20 top-0 bottom-0 w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transition-transform duration-200 ease-in-out ${
        profileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="sticky top-16 bg-white overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-r border-slate-200 md:w-72 xl:w-80 h-[calc(100vh-64px)]">
        {/* Profile group */}
        <div>
          {/* Group header */}
          <div className="sticky top-0 z-10">
            <div className="flex items-center bg-white border-b border-slate-200 px-5 h-16">
              <div className="w-full flex items-center justify-between">
                {/* Profile image */}
                <div className="relative">
                  <div className="grow flex items-center truncate">
                    <img
                      className="w-8 h-8 rounded-full mr-2"
                      src={profile ? profile.avatar : ProfileImage}
                      width="32"
                      height="32"
                      alt="Group 01"
                    />
                    <div className="truncate">
                      <span className="font-semibold text-slate-800">
                        {profile ? profile.displayName : ""}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Add button */}
                {/* <button className="p-1.5 shrink-0 rounded border border-slate-200 hover:border-slate-300 shadow-sm ml-2">
                  <svg
                    className="w-4 h-4 fill-current text-indigo-500"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1Z" />
                  </svg>
                </button> */}
              </div>
            </div>
          </div>
          {/* Group body */}
          <div className="px-5 py-4">
            {/* Search form */}
            {/* <form className="relative">
              <label htmlFor="profile-search" className="sr-only">
                Search
              </label>
              <input
                id="profile-search"
                className="form-input w-full pl-9 focus:border-slate-300"
                type="search"
                placeholder="Search…"
              />
              <button
                className="absolute inset-0 right-auto group"
                type="submit"
                aria-label="Search"
              >
                <svg
                  className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form> */}
            {/* Team members */}
            <div className="mt-4">
              <div className="text-xs font-semibold text-slate-400 uppercase mb-3">
                Club Members
              </div>
              <ul className="mb-6">
                {members.length > 0 ? (
                  members
                  .filter(m => m.membershipStatus === true)
                  .map((member) => {
                    return (
                      <li className="-mx-2">
                        <button
                          className={
                            "w-full p-2 rounded " +
                            (selectedId === member.id ? "bg-indigo-100" : "")
                          }
                          onClick={() => onSelectMember(member.id)}
                        >
                          <div className="flex items-center">
                            <div className="relative mr-2">
                              <img
                                className="w-8 h-8 rounded-full"
                                src={member.avatar}
                                width="32"
                                height="32"
                                alt="User 08"
                              />
                            </div>
                            <div className="truncate">
                              <span className="text-sm font-medium text-slate-800">
                                {member.displayName}
                              </span>
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebar;
